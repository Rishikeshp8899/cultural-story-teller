from dataclasses import dataclass

@dataclass
class Story:
    def __init__(self, title: str, story: str, genre: str = ""):
        self.title = title
        self.story = story
        self.genre = genre  



