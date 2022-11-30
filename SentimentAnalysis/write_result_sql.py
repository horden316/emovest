import pymysql
Coin = pymysql.connect('localhost', port=3306, user='root', passwd='', charset='utf8', db='analysis_result')

with Coin.cursor() as cursor:
    cursor.execute("INSERT INTO  `result_score_ave` (`Symbol`,`Score`) VALUE ('BTC','0.759999999999') ")
    Coin.commit()
Coin.close()