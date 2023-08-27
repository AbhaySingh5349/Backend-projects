# Installation
1. Clone the repository to your local machine:<br />
   ```git clone https://github.com/AbhaySingh5349/Backend-projects.git```
2. Install the dependencies:<br />
   ```npm install```
3. **MySQL for Windows**<br />
   * Download MySQL community server and Workbench: https://dev.mysql.com/downloads/mysql/
   * Create DB in MySQL with same name used in node application
   * To use sequelize in node: *npm install --save sequelize* and *npm install --save mysql2*
4. **Redis for Windows**<br />
   * Follow: https://github.com/microsoftarchive/redis/releases<br />
   * Download: ```Redis-x64-3.0.504.msi```<br />
   * To start Redis: open the command prompt and enter *redis-cli*<br />
   * To use Redis in node: install package *npm install --save ioredis*
5. **Elastic Search and Kibana for Windows**<br />
   * Follow: https://www.elastic.co/guide/en/elasticsearch/reference/8.9/zip-windows.html<br />
   * Download ES: https://www.elastic.co/downloads/elasticsearch<br />
   * Downlaod Kibana: https://www.elastic.co/downloads/kibana<br />
   * set env variables for paths till 'bin' folder<br />
   * use 'elasticsearch' and 'kibana' in separate terminals<br />
   * from 'elasticsearch' terminal save password and token for setting up 'Dev Tools console'<br />
   * from 'kibana' terminal open link and add 'token', 'username = elastic' and 'password' to open 'Dev Tools console'<br />
   * check cluster health in 'Dev Tools console' using ``` GET /_cluster/health ``` and for browser use ```https://localhost:9200/```
   * in ```elasticsearch.yml```:<br />
     **modify**
     ```
     xpack.security.http.ssl:
     enabled: false

     xpack.security.transport.ssl:
     enabled: false
     ```
     **add**<br />
     ```
     http.cors.allow-headers: "Authorization, X-Requested-With, Content-Type, Content-Length"
     ```
   * in ```roles.yml``` <br />
     **add**
     ```
     admins:
     cluster:
       - all
     indices:
       - names:
           - "*"
         privileges:
           - all
      devs:
        cluster:
          - manage
        indices:
          - names:
              - "*"
            privileges:
              - write
              - delete
              - create_index
     ```

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
        "lastScreeningDate": STRING, // "YYYY-MM-DD",
        "reviews": [
            {
                "comment": STRING,
                "rating": FLOAT
            },
            {
                "comment": STRING,
                "rating": FLOAT
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
   * POST /movies/reviews/:movieId => add review to movie
```
{
    "comment": STRING,
    "rating": FLOAT // [0,5]
}
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

**3. Screens :**
  * POST /screens => add screen to particular theatre
```
{
    "theatreId": INT,
    "capacity": INT
}
```

**4. Timings :**
   * POST /timings => add timings to particular screen and movie
```
{
    "movieId": INT,
    "theatreId": INT,
    "screenId": INT,
    "time": STRING (24 hrs format),
}
```

**5. Elastic Search :** Make sure to set *Authorization* as *Basic Auth* and add *username* and *password* for Elastic Search
   * GET http://localhost:9200/INDEX_NAME/_search => get data stored across the particular index (here ```movie_details_idx```)
```
{
    "took": 15,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": INT,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": INDEX_NAME,
                "_id": "-vCpMooB12Zcy5pb874h",
                "_score": 1.0,
                "_source": {
                    "name": "MOVIE_NAME",
                    "cast": "STRING, STRING, ...",
                    "plot": STRING,
                    "language": STRING,
                    "genre": STRING
                }
            },
            {
                "_index": INDEX_NAME,
                "_id": "-_CpMooB12Zcy5pb874z",
                "_score": 1.0,
                "_source": {
                    "name": "MOVIE_NAME",
                    "cast": "STRING, STRING, ...",
                    "plot": STRING,
                    "language": STRING,
                    "genre": STRING
                }
            },
            .
            .
            .
        ]
    }
}
```

   * DELETE http://localhost:9200/INDEX_NAME => for deleting data of index
   * POST http://localhost:3000/index/movies => create bulk index for MovieDetails table
   * GET /index/movies?q=:query&language=:language&genre=:genre => search for movies based on ```movie name```, ```actors name```, ```genre```, ```language```
```
{
    "status": "Success",
    "result": INT,
    "data": [
        {
            "_index": INDEX_NAME,
            "_id": "_PCpMooB12Zcy5pb875B",
            "_score": 1.469157,
            "_source": {
                "name": "MOVIE_NAME",
                "cast": "STRING, STRING, ...",
                "plot": STRING,
                "language": STRING,
                "genre": STRING
            }
        }
        .
        .
        .
    ]
}
```
