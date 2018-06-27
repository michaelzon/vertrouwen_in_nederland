# Name: Michael Zonneveld
# Studentnumber: 11302984

import csv
import json

# read the csv file
with open('data_structure/csv/vertrouwendataset.csv') as csv_f:

    reader = csv.DictReader(csv_f, delimiter = ";")
    rows = list(reader)

# write to json file, making it a dict
with open('data_structure/json/vertrouwen_nederland.json', 'w') as json_f:
    json_f.write('{"vertrouwen":')
    json.dump(rows, json_f)
    json_f.write('}')

# read the csv file
with open('data_structure/csv/politieke_participatie.csv') as csv_f:

    reader = csv.DictReader(csv_f, delimiter = ";")
    rows = list(reader)

# write to json file, making it a dict
with open('data_structure/json/politieke_participatie.json', 'w') as json_f:
    json_f.write('{"participatie":')
    json.dump(rows, json_f)
    json_f.write('}')


# read the csv file
with open('data_structure/csv/politieke_interesse.csv') as csv_f:

    reader = csv.DictReader(csv_f, delimiter = ";")
    rows = list(reader)

# write to json file, making it a dict
with open('data_structure/json/politieke_interesse.json', 'w') as json_f:
    json_f.write('{"interesse":')
    json.dump(rows, json_f)
    json_f.write('}')

# read the csv file
with open('data_structure/csv/internet_faciliteiten.csv') as csv_f:

    reader = csv.DictReader(csv_f, delimiter = ";")
    rows = list(reader)

# write to json file, making it a dict
with open('data_structure/json/internet_faciliteiten.json', 'w') as json_f:
    json_f.write('{"faciliteiten":')
    json.dump(rows, json_f)
    json_f.write('}')

# read the csv file
with open('data_structure/csv/internet_gebruik.csv') as csv_f:

    reader = csv.DictReader(csv_f, delimiter = ";")
    rows = list(reader)

# write to json file, making it a dict
with open('data_structure/json/internet_gebruik.json', 'w') as json_f:
    json_f.write('{"gebruik":')
    json.dump(rows, json_f)
    json_f.write('}')

# read the csv file
with open('data_structure/csv/gebruik_dienstverlening.csv') as csv_f:

    reader = csv.DictReader(csv_f, delimiter = ";")
    rows = list(reader)

# write to json file, making it a dict
with open('data_structure/json/gebruik_dienstverlening.json', 'w') as json_f:
    json_f.write('{"dienstverlening":')
    json.dump(rows, json_f)
    json_f.write('}')
