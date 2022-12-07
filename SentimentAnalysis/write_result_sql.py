import pymysql
Coin = pymysql.connect(host='localhost', port=3306, user='root', passwd='', charset='utf8', db='analysis_result')

with Coin.cursor() as cursor:
    cursor.execute("UPDATE result_score_ave SET Score=0.33333333 WHERE Symbol='BTC'")
    Coin.commit()
Coin.close()