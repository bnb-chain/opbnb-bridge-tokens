import os
import json

changed_token_files = os.environ.get("CHANGED_TOKEN_FILES")
target_files = os.environ.get("TARGET_FILES")
github_repo = os.environ.get("REPO")

with open(target_files) as target_file:
    tfr = json.load(target_file)
    current_symbol = [s['symbol'] for s in tfr['tokens']]
    print(current_symbol)
    for path in changed_token_files.split():
        new_token = {}
        with open(path) as file:
            fr = json.load(file)
            if 'l2Address' not in fr:
                raise Exception('l2Address doesn not exist! check source pr please!')
            if fr['symbol'] not in current_symbol:
                new_token['name'] = fr['name']
                new_token['symbol'] = fr['symbol']
                new_token['decimals'] = fr['decimals']
                new_token['logoURI'] = "https://raw.githubusercontent.com/" + github_repo + "/main/" + path.rsplit('/', 1)[0] + '/' + fr['logoURI']
                new_token['l1Address'] = fr['l1Address']
                new_token['l2Address'] = fr['l2Address']
                new_token['metadata'] = fr['metadata']

                print("new_token content:")
                print(new_token)
                tfr['tokens'].append(new_token)
json_format = json.dumps(tfr, indent=4, separators=(',', ': '))

with open(target_files, mode='a', encoding='utf-8') as new_tokenlist:
    new_tokenlist.truncate(0)
    print(json_format, file=new_tokenlist)
