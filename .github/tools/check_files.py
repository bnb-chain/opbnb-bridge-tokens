import os


changed_files = os.environ.get("CHANGED_FILES")

res = []
for path in changed_files.split():
    if path.startswith('data/') and path.endswith(".json"):
        res.append(path)
        continue
res_str=' '.join(res)
print(f"::set-output name=CHANGED_SPEC_FILES::{res_str}")