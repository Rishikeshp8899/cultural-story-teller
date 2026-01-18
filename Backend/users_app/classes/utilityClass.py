from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from dotenv import load_dotenv
import os

load_dotenv()

def hash_password(password: str) -> str:
    peppered = password + os.getenv("PASSWORD_PEPPER")
    return make_password(peppered)


def verify_password(password: str, hashed: str) -> bool:
    peppered = password + os.getenv("PASSWORD_PEPPER")
    return check_password(peppered, hashed)