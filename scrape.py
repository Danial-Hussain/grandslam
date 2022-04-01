from typing import Tuple
import requests as rq
import pandas as pd
import json

def get_tournament_url(
    year: int,
    tournament: str
) -> str:
    ''' Get the url from atp tour with match results '''
    if tournament == "wimbledon":
        return f"https://www.atptour.com/en/scores/archive/\
            wimbledon/540/{year}/results"
    elif tournament == "us-open":
        return f"https://www.atptour.com/en/scores/archive/\
            us-open/560/{year}/results"
    elif tournament == "roland-garros":
        return f"https://www.atptour.com/en/scores/archive/\
            roland-garros/520/{year}/results"
    elif tournament == "australian-open":
        return f"https://www.atptour.com/en/scores/archive/\
            australian-open/580/{year}/results"
    raise Exception("Invalid grandslam tournament")


def parse_score(
    score: list
) -> Tuple[int, int]:
    ''' Parse a match score '''
    winner, loser = 3, 0
    for s in score:
        if s[0] == '(': continue
        s1 = int(s[0])
        s2 = int(s[1])
        if s2 > s1: loser += 1
    return (winner, loser)


def build_tree(
    df: pd.DataFrame
) -> dict:
    ''' Build the tournament bracket json data '''
    def recursive_build(round: str, player:str):
        ''' Recursively build the tree '''
        match = df[(df["round"] == round) & (df["winner"] == player)]

        if len(match) == 0:
            return {"name": player, "size": 1}

        w_score, l_score = parse_score(match["score"].values[0].split(" "))
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
    tournament: str
) -> pd.DataFrame:
    ''' Get and clean the data '''
    page = rq.get(get_tournament_url(year, tournament))
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


if __name__ == "__main__":
    year = 2010
    tournament = "wimbledon"
    data = get_data(year, tournament)
    tree = build_tree(data)

    with open(f'{tournament}-{year}.json', 'w') as f:
        json.dump(tree, f)