#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Jun  7 11:05:44 2022

@author: horden
"""

import random
import os


basepath=os.getcwd()


#讀positive的檔案
path=(basepath+"/Scraping/data/positive.txt")

print("path"+path)
with open(path,"r") as f:
    lines = f.readlines()
    
    
path_base= basepath+ "/Scraping/data/Coinmarket_comments_dataset/"  #獲取目前路徑


random.shuffle(lines)

train_data_pos=(lines[:(len(lines)//2)])


test_data_pos=(lines[(len(lines)//2):])


for i in range(len(train_data_pos)):
    with open(path_base+"train/pos/"+str(i)+".txt","w") as f2:
        f2.write(train_data_pos[i].replace("\n",""))


for i in range(len(test_data_pos)):
    with open(path_base+"test/pos/"+str(i)+".txt","w") as f3:
        f3.write(test_data_pos[i].replace("\n",""))




#讀negative的檔案
path2=(basepath+"/Scraping/data/negative.txt")
with open(path2,"r") as f4:
    lines2= f4.readlines()



randomlist_neg=random.shuffle(lines2)

train_data_neg=(lines2[:(len(lines2)//2)])
test_data_neg=(lines2[(len(lines2)//2):])


for i in range(len(train_data_neg)):
    with open(path_base+"train/neg/"+str(i)+".txt","w") as f5:
        f5.write(train_data_neg[i].replace("\n",""))


for i in range(len(test_data_neg)):
    with open(path_base+"test/neg/"+str(i)+".txt","w") as f6:
        f6.write(test_data_neg[i].replace("\n",""))


