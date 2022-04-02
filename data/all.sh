#! /bin/bash
python scrape.py -s=2010 -e=2021 -t="us-open" -l="atp"
python scrape.py -s=2010 -e=2021 -t="wimbledon" -l="atp"
python scrape.py -s=2010 -e=2021 -t="australian-open" -l="atp"
python scrape.py -s=2010 -e=2021 -t="roland-garros" -l="atp"
python scrape.py -s=2010 -e=2021 -t="us-open" -l="wta"
python scrape.py -s=2010 -e=2021 -t="wimbledon" -l="wta"
python scrape.py -s=2010 -e=2021 -t="australian-open" -l="wta"
python scrape.py -s=2010 -e=2021 -t="roland-garros" -l="wta"