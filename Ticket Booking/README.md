# API Endpoints
1. Movies :
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
