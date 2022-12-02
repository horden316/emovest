import os
import shutil #檔案管理套件copy move remove等工具

import tensorflow as tf
import tensorflow_hub as hub
import tensorflow_text as text
from official.nlp import optimization  # to create AdamW optimizer 優化算法

import matplotlib.pyplot as plt #繪圖工具

import statistics
import numpy as np
import time

basepath=os.getcwd()
saved_model_path = basepath+"/SentimentAnalysis/coinmarket_bert"
reloaded_model = tf.saved_model.load(saved_model_path)



coinsymbol=["BTC","ETH","BNB","XRP","ADA","SOL","DOGE","DOT","TRX","AVAX","LUNA"]
resultdict={"BTC":0,"ETH":0,"BNB":0,"XRP":0,"ADA":0,"SOL":0,"DOGE":0,"DOT":0,"TRX":0,"AVAX":0,"LUNA":0}


# def print_my_score_without_example(results):
#     result_for_printing = \
#         [f'{results[i][0]:.6f}'
#                             for i in range(len(results))]
#     print(*result_for_printing, sep='\n')
#     print()

InitialTime=time.time()-14400

while True:
    #四小時抓一次
    if time.time()-InitialTime > 14400:
        print(time.time())
        InitialTime=time.time()

        for j in range(len(coinsymbol)):
            path=basepath+"/SentimentAnalysis/data/"+coinsymbol[j]+".txt"
            with open(path,"r") as f:
                examples = f.readlines()


            reloaded_results = tf.sigmoid(reloaded_model(tf.constant(examples)))

            print(coinsymbol[j] +' Results from the saved model:')

            result_for_printing = \
                [f'{reloaded_results[i][0]:.6f}'
                                    for i in range(len(reloaded_results))]
            #print(*result_for_printing, sep='\n')

            floatresult = list(np.float_(result_for_printing))
            mean = statistics.mean(floatresult)
            resultdict[coinsymbol[j]]=mean
            
        print(resultdict)

        import pymysql
        Coin = pymysql.connect(host='localhost', port=3306, user='root', passwd='', charset='utf8', db='analysis_result')

        with Coin.cursor() as cursor:
            for r in resultdict.items():
                cursor.execute("UPDATE result_score_ave SET Score="+ str(r[1]) +" WHERE Symbol='"+str(r[0])+"'")
                Coin.commit()
        Coin.close()

