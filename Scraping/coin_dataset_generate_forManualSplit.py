#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Jun  7 11:05:44 2022

@author: horden
"""

import random
import os


basepath=os.getcwd()


#讀TrainPOS的檔案
path=(basepath+"/Scraping/data/timeTrainPOS.txt")

print("path"+path)
with open(path,"r") as f:
    lines = f.readlines()
    
    
path_base= basepath+ "/Scraping/data/Coinmarket_comments_dataset/"  #獲取目前路徑


random.shuffle(lines)

for i in range(len(lines)):
    with open(path_base+"train/pos/"+str(i)+".txt","w") as f2:
        f2.write(lines[i].replace("\n",""))



#讀TrainNEG的檔案
path=(basepath+"/Scraping/data/timeTrainNEG.txt")

print("path"+path)
with open(path,"r") as f3:
    lines2 = f3.readlines()
    
    
path_base= basepath+ "/Scraping/data/Coinmarket_comments_dataset/"  #獲取目前路徑


random.shuffle(lines2)

for i in range(len(lines2)):
    with open(path_base+"train/neg/"+str(i)+".txt","w") as f4:
        f4.write(lines2[i].replace("\n",""))


#讀TestPOS的檔案
path=(basepath+"/Scraping/data/timeTestPOS.txt")

print("path"+path)
with open(path,"r") as f5:
    lines3 = f5.readlines()
    
    
path_base= basepath+ "/Scraping/data/Coinmarket_comments_dataset/"  #獲取目前路徑


random.shuffle(lines3)

for i in range(len(lines3)):
    with open(path_base+"test/pos/"+str(i)+".txt","w") as f6:
        f6.write(lines3[i].replace("\n",""))



#讀TestNEG的檔案
path=(basepath+"/Scraping/data/timeTestNEG.txt")

print("path"+path)
with open(path,"r") as f7:
    lines4 = f7.readlines()
    
    
path_base= basepath+ "/Scraping/data/Coinmarket_comments_dataset/"  #獲取目前路徑


random.shuffle(lines4)

for i in range(len(lines4)):
    with open(path_base+"test/neg/"+str(i)+".txt","w") as f8:
        f8.write(lines4[i].replace("\n",""))