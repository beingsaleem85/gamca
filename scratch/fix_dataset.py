import json

with open("src/data/medical-centers.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for item in data:
    if item["id"] == "mc-123" or "STAR DIAGNOSTIC" in item["name"] or item["city"] == "+92917257007":
        item["name"] = "STAR DIAGNOSTIC CENTER"
        item["slug"] = "star-diagnostic-center"
        item["country"] = "Pakistan"
        item["city"] = "Peshawar"
        item["addressLine1"] = "1354-B Saddar Road, Peshawar"
        item["addressLine2"] = ""
        item["phone"] = "+92917257007"
        item["email"] = "stardiagnosticpk@gmail.com"
        item["website"] = "https://stardiagnosticpk.com/"

# Also clean up any city values that start with '+' or numbers
valid_cities = []
for item in data:
    if item["city"].startswith("+") or item["city"].isdigit():
        print(f"Fixing item {item['id']}: {item['name']}, city was {item['city']}")
        item["city"] = "Peshawar"
    valid_cities.append(item["city"])

with open("src/data/medical-centers.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Unique cities after fix:", sorted(list(set(valid_cities))))
