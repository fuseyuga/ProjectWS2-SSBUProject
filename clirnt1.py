
import http.client

conn = http.client.HTTPConnection("localhost", 8000)

message = input("メッセージを入力してください：")

conn.request("POST", "/messages", body=message)

response = conn.getresponse()

print("Status Code:", response.status)

if response.status == 200:
    print("メッセージを登録しました")
elif response.status == 400:
    print("エラー：空文字は登録できません")

response.read()
conn.close()
