# API Endpoints
**1. Movies :**
   
  * POST /movies => add new movie

```
{
  "name": STRING,
  "overview": STRING,
  "firstScreeningDate": STRING, // "YYYY-MM-DD"
  "lastScreeningDate": STRING // "YYYY-MM-DD"
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
            .
            .
            .
        ]
    },
    .
    .
    .
]
```

**2. Theatres :**
   * POST /theatres => add theatre to city
```
{
    "city": STRING
}
```
   * GET /theatres/shows/:theatreId => get all shows in next 7 days
```
[
    {
        "name": "MOVIE_NAME",
        "overview": STRING,
        "firstScreeningDate": STRING, // "YYYY-MM-DD"
        "lastScreeningDate": STRING, // "YYYY-MM-DD"
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
            .
            .
            .
        ]
    }
    .
    .
    .
]
```









