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
   * GET /movies?language=...&genres=g1,g2,... => get all movies based on language and genre
```
[
    {
        "id": INT,
        "name": STRING,
        "overview": STRING,
        "firstScreeningDate": STRING, // "YYYY-MM-DD"
        "lastScreeningDate": STRING, // "YYYY-MM-DD"
    },
    .
    .
    .
]
```

   * POST /movies/details/ => add movie static data
```
{
    "movieId": INT,
    "name": STRING,
    "cast": [STRING, STRING, ...],
    "plot": STRING,
    "language": STRING,
    "genre": STRING
}
```

   * GET /movies/details/:id => get movie details by id with *redis-caching*
```
{
    "name": STRING,
    "moviedetails": {
        "cast": [
            STRING,
            STRING, ...
        ],
        "plot": STRING,
        "language": STRING,
        "genre": STRING
    }
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
   * GET /theatres/shows/:theatreId => get all shows of particular theatre in next 7 days
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
   * GET /theatres/city/:city => get information of all movies for all theatres in a city
```
[
    {
        "theatre": "THEATRE_NAME",
        "movies": [
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
                ]
            }
        ]
    },
    .
    .
    .
]
```

**3. Screens :**
  * POST /screens
```
{
    "theatreId": INT,
    "capacity": INT
}
```

**4. Timings :**
   * POST /timings
```
{
    "movieId": INT,
    "theatreId": INT,
    "screenId": INT,
    "time": STRING (24 hrs format),
}
```








