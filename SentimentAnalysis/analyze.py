import os
import shutil #檔案管理套件copy move remove等工具

import tensorflow as tf
import tensorflow_hub as hub
import tensorflow_text as text
from official.nlp import optimization  # to create AdamW optimizer 優化算法

import matplotlib.pyplot as plt #繪圖工具
saved_model_path="/Users/horden/Desktop/coinmarket_bert"
reloaded_model = tf.saved_model.load(saved_model_path)

with open("/Users/horden/Documents/GitHub/emovest/SentimentAnalysis/AlltestNEG2080.txt","r") as f:
    examples = f.readlines()


reloaded_results = tf.sigmoid(reloaded_model(tf.constant(examples)))

print('Results from the saved model:')

def print_my_score_without_example(results):
  result_for_printing = \
    [f'{results[i][0]:.6f}'
                         for i in range(len(results))]
  print(*result_for_printing, sep='\n')
  print()

print_my_score_without_example(reloaded_results)