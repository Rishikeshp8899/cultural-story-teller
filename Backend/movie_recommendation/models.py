from django.db import models

class CustomerDetails(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    age=models.IntegerField()
    hero_name=models.CharField(max_length=255)
    interests=models.CharField(max_length=255)
    world_setting=models.CharField(max_length=255)
    educational_goals=models.CharField(max_length=255)
    cus_id=models.CharField(max_length=255,unique=True)
    class Meta:
        db_table = "customer_details"



class VideoStats(models.Model):
    video_id = models.CharField(
        max_length=255,
        primary_key=True
    )
    avg_watch_time = models.FloatField()
    avg_completion_rate = models.FloatField()
    like_rate = models.FloatField()
    share_rate = models.FloatField()
    skip_rate = models.FloatField()
    popularity_score = models.FloatField()
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = "video_stats"
        indexes = [
            models.Index(fields=["popularity_score"]),
            models.Index(fields=["updated_at"]),
        ]

    def __str__(self):
        return f"VideoStats({self.video_id})"
    
    
class VideoEventLogs(models.Model):
      id = models.BigAutoField(primary_key=True)
      event_type = models.TextField(null=True, blank=True)
      user_id = models.TextField(null=True, blank=True)
      video_id = models.TextField(null=True, blank=True)
      watch_time = models.IntegerField(null=True, blank=True)
      completion_rate = models.FloatField(null=True, blank=True)
      like = models.BooleanField(default=False)
      comment = models.BooleanField(default=False)
      share = models.BooleanField(default=False)
      skipped = models.BooleanField(default=False)
      session_position = models.IntegerField(null=True, blank=True)
      created_at = models.DateTimeField(auto_now_add=True)
      action = models.SmallIntegerField(null=True, blank=True)
      class Meta:
            db_table = "video_event_logs"
            indexes = [
                models.Index(fields=["user_id"]),
                models.Index(fields=["video_id"]),
                models.Index(fields=["created_at"]),
            ]




class Video(models.Model):
    id = models.BigAutoField(primary_key=True)

    video_id = models.TextField(null=True, blank=True)
    title = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    language = models.TextField(null=True, blank=True)
    genre = models.TextField(null=True, blank=True)
    duration_sec = models.IntegerField(null=True, blank=True)
    source_type = models.SmallIntegerField(null=True, blank=True)

    created_by = models.TextField(null=True, blank=True)

    is_active = models.BooleanField(default=True)
    safety_score = models.FloatField(default=1.0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    prompt = models.TextField(null=True, blank=True)
    status = models.TextField(null=True, blank=True)
    tag = models.TextField(null=True, blank=True)
    path = models.TextField(null=True, blank=True)

    class Meta:
        db_table = "videos"

    def __str__(self):
        return self.title or str(self.id)

