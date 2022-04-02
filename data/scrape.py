from typing import Tuple
import requests as rq
import pandas as pd
import datetime
import argparse
import dotenv
import redis
import json
import os

def get_tournament_url(
    year: int,
    tournament: str,
    league: str
) -> str:  
    ''' Get the url from atp tour with match results '''
    if tournament == "wimbledon":
        if league == "wta":
          return f"https://www.tennisexplorer.com/wimbledon/{year}/wta-women/"
        else:
          return f"https://www.atptour.com/en/scores/archive/\
            wimbledon/540/{year}/results"
    elif tournament == "us-open":
        if league == "wta":
          return f"https://www.tennisexplorer.com/us-open/{year}/wta-women/"
        else:
          return f"https://www.atptour.com/en/scores/archive/\
            us-open/560/{year}/results"
    elif tournament == "roland-garros":
        if league == "wta":
          return f"https://www.tennisexplorer.com/french-open/{year}/wta-women/"
        else:
          return f"https://www.atptour.com/en/scores/archive/\
            roland-garros/520/{year}/results"
    elif tournament == "australian-open":
        if league == "wta":
          return f"https://www.tennisexplorer.com/australian-open/{year}/wta-women/"
        else:
          return f"https://www.atptour.com/en/scores/archive/\
            australian-open/580/{year}/results"
    raise Exception("Invalid grandslam tournament")


def parse_score(
    score: list,
    league: str
) -> Tuple[int, int]:
    ''' Parse a match score '''
    if league == 'atp': winner, loser = 3, 0
    else: winner, loser = 2, 0

    for s in score:
        if s == '' or s[0] == '(': continue
        s1 = int(s[0])
        s2 = int(s[1])
        if s2 > s1: loser += 1
    return (winner, loser)


def build_tree(
    df: pd.DataFrame,
    league: str
) -> dict:
    ''' Build the tournament bracket json data '''
    def recursive_build(round: str, player:str):
        ''' Recursively build the tree '''
        match = df[(df["round"] == round) & (df["winner"] == player)]

        if len(match) == 0:
            return {"name": player, "size": 1}

        w_score, l_score = parse_score(match["score"].values[0].split(" "), league)
        winner = recursive_build(round + 1, match["winner"].values[0])
        loser = recursive_build(round + 1, match["loser"].values[0])
        
        return {
            "name": player, 
            "w_score": w_score, 
            "l_score": l_score, 
            "children": [winner, loser]
        }
    
    tournament_winner = df.iloc[0,0]
    return recursive_build(0, tournament_winner)


def get_data(
    year: int,
    tournament: str,
    league: str
) -> pd.DataFrame:
    ''' Get and clean data '''
    if league == "atp":
        return get_data_atp(year, tournament)
    elif league == "wta":
        return get_data_wta(year, tournament)
    raise Exception("Invalid tennis league")


def get_data_atp(
    year: int,
    tournament: str
) -> pd.DataFrame:
    ''' Get data for ATP Tournaments '''
    page = rq.get(get_tournament_url(year, tournament, 'atp'))
    df = pd.read_html(page.text)[2]
    df = df.iloc[0:127, [2, 6, 7]]
    df.columns = ["winner", "loser", "score"]
    round, counter = 0, 0
    df["round"] = 0

    for i in range(len(df)):
        if counter < 2 ** round:
            df.iloc[i, 3] = round
            counter += 1; continue
        round += 1; counter = 1
        df.iloc[i, 3] = round

    return df


def get_data_wta(
    year: int,
    tournament: str
) -> pd.DataFrame:
    ''' Get data for WTA Tournaments '''
    page = rq.get(get_tournament_url(year, tournament, 'wta'))
    df = pd.read_html(page.text)[0]

    df = df[~pd.isna(df["Round"])].iloc[:, [1, 2, 4, 5, 6, 7, 8]]
    df.columns = ["Round", "Player", "1", "2", "3", "4", "5"]

    mappings = {"F": 0, "SF": 1, "QF": 2,
     "R16": 3, "3R": 4, "2R": 5, "1R": 6}
    df["Round"] = df["Round"].map(mappings)

    for value in ["1", "2", "3", "4", "5"]:
      df[value] = df[value].apply(
          lambda x: str(int(x)) 
            if pd.isna(x) == False else x
      )

    new_df = pd.DataFrame(columns = ["winner", "loser", "score", "round"])

    for i in range(0, len(df), 2):
      round = df.iloc[i, 0]
      winner = df.iloc[i, 1]
      loser = df.iloc[i+1, 1]
      score = ""

      for val in [2, 3, 4, 5, 6]:
        p1_set_score = df.iloc[i, val]
        p2_set_score = df.iloc[i+1, val]

        if pd.isna(p1_set_score) == False: 
          score += p1_set_score + p2_set_score + " "
      
      new_df = new_df.append({
          "winner": winner, 
          "loser": loser, 
          "score": score.rstrip(), 
          "round": round
          }, ignore_index= True)

    return new_df


if __name__ == "__main__":
    ''' Run the program '''
    parser = argparse.ArgumentParser()

    parser.add_argument(
        '-s', '--start', 
        type = int, 
        required = True, 
        dest = 'start_year', 
        help = 'start year'
    )
    
    parser.add_argument(
        '-e', 
        '--end', 
        type = int, 
        dest = 'end_year', 
        help = 'end year',
        default = datetime.date.today().year
    )

    parser.add_argument(
        '-t',
        '--tournament',
        type = str,
        required = True,
        dest = "tournament",
        help = "tournament",
        choices = [
            "us-open", 
            "wimbledon", 
            "roland-garros", 
            "australian-open"
        ]
    )

    parser.add_argument(
        '-l',
        '--league',
        type = str,
        required = True,
        dest = 'league',
        help = 'league',
        choices = ['atp', 'wta']
    )

    args = parser.parse_args()
    end_year = args.end_year
    start_year = args.start_year
    tournament = args.tournament
    league = args.league

    dotenv.load_dotenv(dotenv_path = ".env")
    REDIS_HOST = os.environ.get("REDIS_HOST")
    REDIS_PORT = os.environ.get("REDIS_PORT")
    REDIS_PASS = os.environ.get("REDIS_PASS")

    r = redis.Redis(
        host = REDIS_HOST,
        port = REDIS_PORT,
        password = REDIS_PASS
    )

    years = range(start_year, end_year + 1)

    for year in list(years):
        key = f'{league}/{tournament}/{year}'

        try:
            print(f"*** Getting data for {key} ***")
            data = get_data(year, tournament, league)
            tree = build_tree(data, league)
            r.set(key, json.dumps(tree))
        except Exception as error: 
            print(f"*** Failed to get data for {key} ***")
            print(f"Error: {error}")
        finally:
            print("-" * 40 + "\n")