# API Endpoints
**1. Movies :**
   
  * POST /movies => add new movie

```
{
  "name": "Crazy Stupid Love",
  "overview": "fun and drama",
  "firstScreeningDate": "2023-06-25",
  "lastScreeningDate": "2023-08-28"
}
```

   * GET /movies/:id/city/:city => get information about theatres for a given movie and city
```
[
    {
        "name": "THEATRE_NAME",
        "Timings": [
            {
                "screenId": INT,
                "time": STRING (12 hrs format),
                "ticketsAvailable": BOOLEAN
            },
            {
                "screenId": INT,
                "time": STRING (12 hrs format),
                "ticketsAvailable": BOOLEAN
            }
        ]
    },
    {
        "name": "THEATRE_NAME",
        "Timings": [
            {
                "screenId": INT,
                "time": STRING (12 hrs format),
                "ticketsAvailable": BOOLEAN
            }
        ]
    }
]
```






