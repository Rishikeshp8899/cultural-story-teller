from django.db import connection

def insert_parent_preference():
    with connection.cursor() as cursor:
        cursor.execute(
            
        )