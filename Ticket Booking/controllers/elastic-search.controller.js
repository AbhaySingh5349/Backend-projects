const { MovieDetails } = require("../models/movie_details.model");
const { ESClient } = require("../config/elasticsearch");
const indexName = "movie_details_idx";

const createBulkMovieDetailsIndex = async (req, res) => {
  const movieDetails = await MovieDetails.findAll();
  try {
    await ESClient.indices.create({
      index: indexName,
      body: {
        settings: {
          analysis: {
            analyzer: {
              edge_ngram_analyzer: {
                type: "custom",
                tokenizer: "standard",
                filter: ["lowercase", "edge_ngram_tokenizer"],
              },
            },
            filter: {
              edge_ngram_tokenizer: {
                type: "edge_ngram",
                min_gram: 2, // Minimum n-gram length
                max_gram: 5, // Maximum n-gram length
                token_chars: ["letter", "digit"], // Token characters
              },
            },
          },
        },
        mappings: {
          properties: {
            name: {
              type: "text",
              analyzer: "edge_ngram_analyzer", // Use the custom analyzer
            },
            cast: {
              type: "text",
              analyzer: "edge_ngram_analyzer",
            },
            plot: {
              type: "text",
              analyzer: "edge_ngram_analyzer",
            },
            language: {
              type: "text",
              analyzer: "edge_ngram_analyzer",
            },
            genre: {
              type: "text",
              analyzer: "edge_ngram_analyzer",
            },
          },
        },
      },
    });

    for (const movie of movieDetails) {
      await ESClient.index({
        index: indexName,
        body: {
          name: movie.name,
          cast: movie.cast.join(", "), // since cast is Array of strings
          plot: movie.plot,
          language: movie.language,
          genre: movie.genre,
        },
      });
    }

    return res.status(201).json({ message: "Index successfully created." });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "error in creating bul index: ", err });
  }
};

const searchMovies = async (req, res) => {
  try {
    let query;
    if (req.query.q) {
      query = {
        multi_match: {
          query: req.query.q,
          fields: ["name", "cast", "plot", "language", "genre"],
          type: "cross_fields",
        },
      };
    } else {
      query = {
        match_all: {}, // Match all documents
      };
    }

    const result = await ESClient.search({
      index: indexName,
      body: {
        query: query,
      },
    });
    return res.status(200).json({
      status: "Success",
      result: result.hits.hits.length,
      data: result.hits.hits,
    });
  } catch (error) {
    console.error("Error searching movies from ES:", error);
    return res.status(400).json(error);
  }
};

module.exports = {
  createBulkMovieDetailsIndex,
  searchMovies,
};
