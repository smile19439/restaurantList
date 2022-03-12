![image](https://github.com/smile19439/restaurantList/blob/main/image/%E6%93%B7%E5%8F%96.PNG)
## 功能
1.使用者可於首頁瀏覽所有餐廳名稱、類別及評分  
  
2.餐廳搜尋功能:於搜尋框輸入關鍵字來搜尋餐廳名稱或餐廳類別  
(可使用多個關鍵字搜尋，只需要使用「,」區隔即可)  
  
3.使用者可以新增餐廳
  
4.點擊任一餐廳可進入該餐廳詳細資料頁面  

5.點擊Edit按鈕進入編輯頁面，使用者可編輯餐廳資訊

6.點擊Delete按鈕可刪除餐廳

## 環境建置與需求
Node.js v14.16.0  
Mongodb v5.0.6
## 安裝與執行步驟
1.請先確認已安裝node.js及Mongodb  
  
2.使用終端機將此專案下載至本機
```
git clone https://github.com/smile19439/restaurantList.git
```  
3.cd至存放專案的資料夾後，使用npm安裝套件
```
npm install
```
4.於Mongodb建立好一個名稱為restaurant-list的database  
  
5.輸入以下指令載入種子資料
```
npm run seed
```
6.若您有安裝nodemon，可使用以下指令執行
```
npm run dev
```
若您沒有安裝nodemon，則可使用以下指令
```
npm run start
```
7.終端機顯示以下訊息即代表成功啟動  
>Express is listening on http://localhost:3000
  
8.點擊以下路徑即可開始使用
>http://localhost:3000
