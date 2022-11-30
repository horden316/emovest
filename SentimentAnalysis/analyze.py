import os
import shutil #檔案管理套件copy move remove等工具

import tensorflow as tf
import tensorflow_hub as hub
import tensorflow_text as text
from official.nlp import optimization  # to create AdamW optimizer 優化算法

import matplotlib.pyplot as plt #繪圖工具

basepath=os.getcwd()
saved_model_path = basepath+"/SentimentAnalysis/coinmarket_bert"
reloaded_model = tf.saved_model.load(saved_model_path)

coinsymbol=["BTC","ETH","BNB","XRP","DOGE","ADA","AVAX","TRX","SOL","DOT","LUNA"]



def print_my_score_without_example(results):
    result_for_printing = \
        [f'{results[i][0]:.6f}'
                            for i in range(len(results))]
    print(*result_for_printing, sep='\n')
    print()

for j in range(len(coinsymbol)):
    path=basepath+"/SentimentAnalysis/data/"+coinsymbol[j]+".txt"
    with open(path,"r") as f:
        examples = f.readlines()


    reloaded_results = tf.sigmoid(reloaded_model(tf.constant(examples)))

    print(coinsymbol +' Results from the saved model:')

    

    print_my_score_without_example(reloaded_results)