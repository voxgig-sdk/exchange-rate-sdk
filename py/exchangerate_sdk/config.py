# ExchangeRate SDK configuration


def make_config():
    return {
        "main": {
            "name": "ExchangeRate",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.exchangerate-api.com/v4",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "latest": {},
            },
        },
        "entity": {
      "latest": {
        "fields": [],
        "name": "latest",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "base_currency",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/latest/{base_currency}",
                "parts": [
                  "latest",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "base_currency": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
