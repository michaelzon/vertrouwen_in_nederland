# Name: Michael Zonneveld
# Studentnumber: 11302984

import csv
import json

# read the csv file
with open('vertrouwendataset.csv') as csv_f:

    reader = csv.DictReader(csv_f, delimiter = ";")
    rows = list(reader)

# write to json file, making it a dict
with open('vertrouwen_nederland.json', 'w') as json_f:
    json_f.write('{"vertrouwen":')
    json.dump(rows, json_f)
    json_f.write('}')


# read the csv file
with open('politieke_participatie.csv') as csv_f:

    reader = csv.DictReader(csv_f, delimiter = ";")
    rows = list(reader)

# write to json file, making it a dict
with open('politieke_participatie.json', 'w') as json_f:
    json_f.write('{"participatie":')
    json.dump(rows, json_f)
    json_f.write('}')


# read the csv file
with open('politieke_interesse.csv') as csv_f:

    reader = csv.DictReader(csv_f, delimiter = ";")
    rows = list(reader)

# write to json file, making it a dict
with open('politieke_interesse.json', 'w') as json_f:
    json_f.write('{"interesse":')
    json.dump(rows, json_f)
    json_f.write('}')

# read the csv file
with open('internet_faciliteiten.csv') as csv_f:

    reader = csv.DictReader(csv_f, delimiter = ";")
    rows = list(reader)

# write to json file, making it a dict
with open('internet_faciliteiten.json', 'w') as json_f:
    json_f.write('{"faciliteiten":')
    json.dump(rows, json_f)
    json_f.write('}')

# read the csv file
with open('internet_gebruik.csv') as csv_f:

    reader = csv.DictReader(csv_f, delimiter = ";")
    rows = list(reader)

# write to json file, making it a dict
with open('internet_gebruik.json', 'w') as json_f:
    json_f.write('{"gebruik":')
    json.dump(rows, json_f)
    json_f.write('}')
