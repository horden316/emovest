#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May 17 13:58:43 2022

@author: horden
"""

import os
import requests
import time

InitialTime=time.time()-14400
basepath=os.getcwd()

while True:
    #四小時抓一次
    if time.time()-InitialTime > 14400:
        print(time.time())
        InitialTime=time.time()
        
        coinsymbol=["BTC","ETH","BNB","XRP","DOGE","ADA","AVAX","TRX","SOL","DOT","LUNA"]


        for d in range(len(coinsymbol)):
            path=basepath+"/SentimentAnalysis/data/"+coinsymbol[d]+".txt" #指定檔案位置
            with open(path,"w") as dd: #先清空檔案
                            dd.write("")

        for k in range(9):
            for j in range(len(coinsymbol)):

                comment = requests.get('https://api-gravity.coinmarketcap.com/gravity/v3/gravity/search?symbol='+coinsymbol[j]+'&start='+str(k)+'&handleOnly=false&latestSort=true')
                comment_json = comment.json()
                data=comment_json["data"]
                text_con=data[0]


                path=basepath+"/SentimentAnalysis/data/"+coinsymbol[j]+".txt" #指定檔案位置
                
                for i in range(len(data)):
                    try:
                        text_con=data[i]
                        if ((text_con["textContent"] != "$"+coinsymbol[j]) and (text_con["textContent"] != "$"+coinsymbol[j]+" ") and (text_con["textContent"] != "")):#排除留言內容空白的
                            
                            if "$PGIRL" in text_con["textContent"]: #如果出現"$PGIRL"這種垃圾廣告直接跳過這一輪迴圈 
                                continue
                            final_text = text_con["textContent"].strip("$"+coinsymbol[j]) #刪除$BTC字樣
                            final_text = final_text.strip("\n") #刪除有莫名其妙換行的
                            final_text = final_text.lstrip()  #刪除左邊的空格
                            with open(path,"a") as f: #選擇檔案開啟方式 "a"為append，不刪除原本的文字，另外新增上去
                                f.write(final_text+"\n")
                            
                            
                        
                        
                    
                    except:
                        print("expect")
    #沒到時間的時候讓執行緒idle省資源
    time.sleep(1800)

