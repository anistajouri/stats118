from flask import Flask, jsonify
from flask_api import FlaskAPI, status, exceptions
import json
import requests
from flask_cors import CORS
import datetime

es_url = "http://10.198.139.120:9200/"
#es_url = "http://localhost:9200/"
headers = {'content-type':'application/json', 'Access-Control-Allow-Origin': '*'}

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello World!"


@app.route("/proximity/<proximity_date>",  methods=['GET'])
def proximity(proximity_date):
    print("proxi: "+proximity_date )
    data = proximity_date.split("-",3)
    year = data[0]
    month = data[1]
    index = "statistics." + year + "." + month
    print("index to ask for proximity is: " + index)
    gt_str = proximity_date + "T00:00:00.000"
    lt_str = proximity_date + "T23:59:59.000"
    query = json.dumps(
         {"_source":["geocode"],
  "query": {
    "bool": {
      "must": {
        "match": {
          "functionalType": "proximity"
        }
      },
      "filter": {
        "range": {
          "@timestamp": {
                "gt": gt_str,
                 "lt": lt_str

      }
        }
      }
    }
  }
}
)

    response = requests.get(es_url + index + "/_search", data=query, headers=headers)
    response.status_code = status.HTTP_200_OK
    results = json.loads(response.text)
    #for row in results['hits']['hits']:
       # print(row['_source']['geocode'])
    return jsonify(results)

def format(proximity_date):
    data = proximity_date.split("-",3)
    year = data[0]
    month = data[1]
    index = "statistics." + year + "." + month
    return index

#toutes les recherches de proximites
@app.route("/proximites/<proximity_date_debut>/<proximity_date_fin>",  methods=['GET'])
def proximites(proximity_date_debut,proximity_date_fin):
    print("proximity_date_debut: "+proximity_date_debut )
    print("proximity_date_debut: "+proximity_date_fin )
    #treating index to start with
    datad = proximity_date_debut.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = proximity_date_fin.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = proximity_date_debut + "T00:00:00.000"
    lt_str = proximity_date_fin + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
         {
          "query": {
                "bool": {
                    "must": {
                     "match": {
                         "functionalType": "proximity"
                                }
                            },
         "filter": {
                    "range": {
                        "@timestamp": {
                                "gt": gt_str,
                                "lt": lt_str

                                        }
                            }
                    }
                        }
                    }
            })
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(

                    {
                     "query": {
                            "bool": {
                                 "must": {
                                      "match": {
                                             "functionalType": "proximity"
                                                  }
                                         },
                     "filter": {
                               "range": {
                                       "@timestamp": {
                                                    "gt": gt_str

                                                      }
                                                     }
                                         }
                                }
                                }
                    })
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
                         "query": {
                                 "bool": {
                                         "must": {
                                                 "match": {
                                                     "functionalType": "proximity"
                                                             }
                                                    },
                         "filter": {
                                 "range": {
                                    "@timestamp": {
                                              "lt": lt_str

                                                     }
                                             }
                                     }
                                            }
                                    }
                        })
                queries.append(query)
                i +=1
            else:
                query = json.dumps(
                    {
                         "query": {
                           "match": {
                              "functionalType": "proximity"} 
                               }
                     })
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        json_all.append(results)
        i +=1
    
    
        
    
    return json.dumps(json_all)

#toutes les recherches de localité
@app.route("/localites/<proximity_date_debut>/<proximity_date_fin>",  methods=['GET'])
def localites(proximity_date_debut,proximity_date_fin):
    print("proximity_date_debut: "+proximity_date_debut )
    print("proximity_date_debut: "+proximity_date_fin )
    #treating index to start with
    datad = proximity_date_debut.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = proximity_date_fin.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = proximity_date_debut + "T00:00:00.000"
    lt_str = proximity_date_fin + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
         {
          "query": {
                "bool": {
                    "must": {
                     "match": {
                         "functionalType": "locality"
                                }
                            },
         "filter": {
                    "range": {
                        "@timestamp": {
                                "gt": gt_str,
                                "lt": lt_str

                                        }
                            }
                    }
                        }
                    }
            })
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(

                    {
                     "query": {
                            "bool": {
                                 "must": {
                                      "match": {
                                             "functionalType": "locality"
                                                  }
                                         },
                     "filter": {
                               "range": {
                                       "@timestamp": {
                                                    "gt": gt_str

                                                      }
                                                     }
                                         }
                                }
                                }
                    })
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
                         "query": {
                                 "bool": {
                                         "must": {
                                                 "match": {
                                                     "functionalType": "locality"
                                                             }
                                                    },
                         "filter": {
                                 "range": {
                                    "@timestamp": {
                                              "lt": lt_str

                                                     }
                                             }
                                     }
                                            }
                                    }
                        })
                queries.append(query)
                i +=1
            else:
                query = json.dumps(
                    {
                         "query": {
                           "match": {
                              "functionalType": "locality"} 
                               }
                     })
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        json_all.append(results)
        i +=1
    
    
        
    
    return json.dumps(json_all)


#pourcentages de recherches de localité par departement
@app.route("/countylocality/<proximity_date_debut>/<proximity_date_fin>",  methods=['GET'])
def county(proximity_date_debut,proximity_date_fin):
    print("proximity_date_debut: "+proximity_date_debut )
    print("proximity_date_debut: "+proximity_date_fin )
    #treating index to start with
    datad = proximity_date_debut.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = proximity_date_fin.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = proximity_date_debut + "T00:00:00.000"
    lt_str = proximity_date_fin + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "must": {
            "term": {
              "functionalType": "locality"
            }
          },
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "county"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "must": {
            "term": {
              "functionalType": "locality"
            }
          },
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "county"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "must": {
            "term": {
              "functionalType": "locality"
            }
          },
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "county"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "must": {
            "term": {
              "functionalType": "locality"
            }
          }
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "county"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
    departements = {"01": 0,
                    "02": 0,
                    "03": 0,
                    "04": 0,
                    "05": 0,
                    "06": 0,
                    "07": 0,
                    "08": 0,
                    "09": 0,
                    "10": 0,
                    "11": 0,
                    "12": 0,
                    "13": 0,
                    "14": 0,
                    "15": 0,
                    "16": 0,
                    "17": 0,
                    "18": 0,
                    "19": 0,
                    "120": 0,
                    "220": 0,
                    "21": 0,
                    "22": 0,
                    "23": 0,
                    "24": 0,
                    "25": 0,
                    "26": 0,
                    "27": 0,
                    "28": 0,
                    "29": 0,
                    "30": 0,
                    "31": 0,
                    "32": 0,
                    "33": 0,
                    "34": 0,
                    "35": 0,
                    "36": 0,
                    "37": 0,
                    "38": 0,
                    "39": 0,
                    "40": 0,
                    "41": 0,
                    "42": 0,
                    "43": 0,
                    "44": 0,
                    "45": 0,
                    "46": 0,
                    "47": 0,
                    "48": 0,
                    "49": 0,
                    "50": 0,
                    "51": 0,
                    "52": 0,
                    "53": 0,
                    "54": 0,
                    "55": 0,
                    "56": 0,
                    "57": 0,
                    "58": 0,
                    "59": 0,
                    "60": 0,
                    "61": 0,
                    "62": 0,
                    "63": 0,
                    "64": 0,
                    "65": 0,
                    "66": 0,
                    "67": 0,
                    "68": 0,
                    "69": 0,
                    "70": 0,
                    "71": 0,
                    "72": 0,
                    "73": 0,
                    "74": 0,
                    "75": 0,
                    "76": 0,
                    "77": 0,
                    "78": 0,
                    "79": 0,
                    "80": 0,
                    "81": 0,
                    "82": 0,
                    "83": 0,
                    "84": 0,
                    "85": 0,
                    "86": 0,
                    "87": 0,
                    "88": 0,
                    "89": 0,
                    "90": 0,
                    "91": 0,
                    "92": 0,
                    "93": 0,
                    "94": 0,
                    "sum": 0,
                   }
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        while j < len(backets):
            for key in departements.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                if(county_key != "unknown" and key != "sum"):
                    county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                    if (int(key) == int(county_key)):
                        departements[key] = departements[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in departements.keys():
        if(key != "sum"):
            departements["sum"] += departements[key] 
    
    #on calcule les pourcentages
    for key in departements.keys():
        if(key != "sum" and departements["sum"] !=0):
            departements[key] = (departements[key]/departements["sum"])*100


    
    
        
    
    return json.dumps(departements)

from datetime import date
from datetime import timedelta
@app.route("/device",  methods=['GET'])
def device():
    today = date.today()
    #all
    #device percentage for this week
    start_date = today  - timedelta(days= 7)
    today_str = str(today)
    start_date_str = str(start_date)
    print("today: "+ today_str)
    print("satart day of the week: "+ start_date_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    devices = {
        "mobile": 0,
        "desktop": 0,
        "unknown": 0,
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        while j < len(backets):
            for key in devices.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    devices[key] = devices[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in devices.keys():
        if(key != "sum"):
            devices["sum"] += devices[key] 
    
    #on calcule les pourcentages
    for key in devices.keys():
        if(key != "sum" and devices["sum"] !=0):
            devices[key] = (devices[key]/devices["sum"])*100


    
    
        #device percentage for the previous week
    start_date = today  - timedelta(days= 14)
    today_str = str(today  - timedelta(days= 7))
    start_date_str = str(start_date)
    print("today - 14: "+ start_date_str)
    print("today - 7 : "+ today_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    devices1 = {
        "mobile": 0,
        "desktop": 0,
        "unknown": 0,
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        while j < len(backets):
            for key in devices1.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    devices1[key] = devices1[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in devices1.keys():
        if(key != "sum"):
            devices1["sum"] += devices1[key] 
    
    #on calcule les pourcentages
    for key in devices1.keys():
        if(key != "sum" and devices1["sum"] !=0):
            devices1[key] = (devices1[key]/devices1["sum"])*100


    ################################################################################
    #functional type locality
    #device percentage for this week
    start_date = today  - timedelta(days= 7)
    today_str = str(today)
    start_date_str = str(start_date)
    print("today: "+ today_str)
    print("satart day of the week: "+ start_date_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "locality"
                                }
                            },
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "locality"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "locality"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "locality"
                                }
                            },
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    devices2 = {
        "mobile": 0,
        "desktop": 0,
        "unknown": 0,
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        while j < len(backets):
            for key in devices2.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    devices2[key] = devices2[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in devices2.keys():
        if(key != "sum"):
            devices2["sum"] += devices2[key] 
    
    #on calcule les pourcentages
    for key in devices2.keys():
        if(key != "sum" and devices2["sum"] !=0):
            devices2[key] = (devices2[key]/devices2["sum"])*100


    
    
        #device percentage for the previous week
    start_date = today  - timedelta(days= 14)
    today_str = str(today  - timedelta(days= 7))
    start_date_str = str(start_date)
    print("today - 14: "+ start_date_str)
    print("today - 7 : "+ today_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "locality"
                                }
                            },
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "locality"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "locality"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "locality"
                                }
                            },
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    devices3 = {
        "mobile": 0,
        "desktop": 0,
        "unknown": 0,
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        while j < len(backets):
            for key in devices3.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    devices3[key] = devices3[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in devices3.keys():
        if(key != "sum"):
            devices3["sum"] += devices3[key] 
    
    #on calcule les pourcentages
    for key in devices3.keys():
        if(key != "sum" and devices3["sum"] !=0):
            devices3[key] = (devices3[key]/devices3["sum"])*100

    
    ###############################################################################

    ################################################################################
    #functional type proximity
    #device percentage for this week
    start_date = today  - timedelta(days= 7)
    today_str = str(today)
    start_date_str = str(start_date)
    print("today: "+ today_str)
    print("satart day of the week: "+ start_date_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "proximity"
                                }
                            },
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "proximity"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "proximity"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "proximity"
                                }
                            },
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    devices4 = {
        "mobile": 0,
        "desktop": 0,
        "unknown": 0,
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        while j < len(backets):
            for key in devices4.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    devices4[key] = devices4[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in devices4.keys():
        if(key != "sum"):
            devices4["sum"] += devices4[key] 
    
    #on calcule les pourcentages
    for key in devices4.keys():
        if(key != "sum" and devices4["sum"] !=0):
            devices4[key] = (devices4[key]/devices4["sum"])*100


    
    
        #device percentage for the previous week
    start_date = today  - timedelta(days= 14)
    today_str = str(today  - timedelta(days= 7))
    start_date_str = str(start_date)
    print("today - 14: "+ start_date_str)
    print("today - 7 : "+ today_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "proximity"
                                }
                            },
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "proximity"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "proximity"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "proximity"
                                }
                            },
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    devices5 = {
        "mobile": 0,
        "desktop": 0,
        "unknown": 0,
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        while j < len(backets):
            for key in devices5.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    devices5[key] = devices5[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in devices5.keys():
        if(key != "sum"):
            devices5["sum"] += devices5[key] 
    
    #on calcule les pourcentages
    for key in devices5.keys():
        if(key != "sum" and devices5["sum"] !=0):
            devices5[key] = (devices5[key]/devices5["sum"])*100


    ###############################################################################

    ################################################################################
    #functional type inverse
    #device percentage for this week
    start_date = today  - timedelta(days= 7)
    today_str = str(today)
    start_date_str = str(start_date)
    print("today: "+ today_str)
    print("satart day of the week: "+ start_date_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "reverse"
                                }
                            },
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "reverse"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "reverse"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "reverse"
                                }
                            },
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    devices6 = {
        "mobile": 0,
        "desktop": 0,
        "unknown": 0,
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        while j < len(backets):
            for key in devices6.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    devices6[key] = devices6[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in devices6.keys():
        if(key != "sum"):
            devices6["sum"] += devices6[key] 
    
    #on calcule les pourcentages
    for key in devices6.keys():
        if(key != "sum" and devices6["sum"] !=0):
            devices6[key] = (devices6[key]/devices6["sum"])*100


    
    
        #device percentage for the previous week
    start_date = today  - timedelta(days= 14)
    today_str = str(today  - timedelta(days= 7))
    start_date_str = str(start_date)
    print("today - 14: "+ start_date_str)
    print("today - 7 : "+ today_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "reverse"
                                }
                            },
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "reverse"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "reverse"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "reverse"
                                }
                            },
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    devices7 = {
        "mobile": 0,
        "desktop": 0,
        "unknown": 0,
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        while j < len(backets):
            for key in devices7.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    devices7[key] = devices7[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in devices7.keys():
        if(key != "sum"):
            devices7["sum"] += devices7[key] 
    
    #on calcule les pourcentages
    for key in devices7.keys():
        if(key != "sum" and devices7["sum"] !=0):
            devices7[key] = (devices7[key]/devices7["sum"])*100


    ###############################################################################




    ################################################################################
    #functional type crosslinking
    #device percentage for this week
    start_date = today  - timedelta(days= 7)
    today_str = str(today)
    start_date_str = str(start_date)
    print("today: "+ today_str)
    print("satart day of the week: "+ start_date_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "crosslinking"
                                }
                            },
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "crosslinking"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "crosslinking"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "crosslinking"
                                }
                            },
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    devices8 = {
        "mobile": 0,
        "desktop": 0,
        "unknown": 0,
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        while j < len(backets):
            for key in devices8.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    devices8[key] = devices8[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in devices8.keys():
        if(key != "sum"):
            devices8["sum"] += devices8[key] 
    
    #on calcule les pourcentages
    for key in devices8.keys():
        if(key != "sum" and devices8["sum"] !=0):
            devices8[key] = (devices8[key]/devices8["sum"])*100


    
    
        #device percentage for the previous week
    start_date = today  - timedelta(days= 14)
    today_str = str(today  - timedelta(days= 7))
    start_date_str = str(start_date)
    print("today - 14: "+ start_date_str)
    print("today - 7 : "+ today_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "crosslinking"
                                }
                            },
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "crosslinking"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "crosslinking"
                                }
                            },
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {"must": {
                     "match": {
                         "functionalType": "crosslinking"
                                }
                            },
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "device"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    devices9 = {
        "mobile": 0,
        "desktop": 0,
        "unknown": 0,
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        while j < len(backets):
            for key in devices9.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    devices9[key] = devices9[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in devices9.keys():
        if(key != "sum"):
            devices9["sum"] += devices9[key] 
    
    #on calcule les pourcentages
    for key in devices9.keys():
        if(key != "sum" and devices9["sum"] !=0):
            devices9[key] = (devices9[key]/devices9["sum"])*100


    ###############################################################################


    
    
        
    
    return json.dumps({"this_week":devices,
    "previous_week":devices1,
    "this_week_l":devices2,
    "previous_week_l":devices3,
    "this_week_p":devices4,
    "previous_week_p":devices5,
    "this_week_r":devices6,
    "previous_week_r":devices7,
    "this_week_c":devices8,
    "previous_week_c":devices9
    })


################################################profile#############################################


@app.route("/profile",  methods=['GET'])
def profile():
    today = date.today()
    #all
    #profile percentage for this week
    start_date = today  - timedelta(days= 7)
    today_str = str(today)
    start_date_str = str(start_date)
    print("today: "+ today_str)
    print("satart day of the week: "+ start_date_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "profile"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "profile"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "profile"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "profile"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    profiles1 = {
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        #initiate profiles1.keys
        while j < len(backets):
            print("keyyyy"+backets[j]['key'])
            profiles1[backets[j]['key']] = 0
            j +=1
        i +=1
    print("lissst"+ str(profiles1))
    i = 0
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        #initiate profiles2.keys
        while j < len(backets):
            for key in profiles1.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    profiles1[key] = profiles1[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in profiles1.keys():
        if(key != "sum"):
            profiles1["sum"] += profiles1[key] 
    
    #on calcule les pourcentages
    for key in profiles1.keys():
        if(key != "sum" and profiles1["sum"] !=0):
            profiles1[key] = (profiles1[key]/profiles1["sum"])*100
        
    #############################################################################prev week
     #all
    #profile percentage for this week
    start_date = today  - timedelta(days= 14)
    today_str = str(today  - timedelta(days= 7))
    start_date_str = str(start_date)
    print("today: "+ today_str)
    print("satart day of the week: "+ start_date_str)
    #treating index to start with
    datad = start_date_str.split("-",3)
    yeard = datad[0]
    monthd = datad[1]
    dayd = datad[2]
    indexd = "statistics." + yeard + "." + monthd
    print("index debut: " + indexd)
    #treating index to end with
    dataf = today_str.split("-",3)
    yearf = dataf[0]
    monthf = dataf[1]
    dayf = dataf[2]
    indexf = "statistics." + yearf + "." + monthf
    print("index fin: " + indexf)
    #this for respecting the start date in monthd & the end date in the monthf 
    gt_str = start_date_str + "T00:00:00.000"
    lt_str = today_str + "T23:59:59.000"
    #starting the global treatment
    #if we have 1 index
    #if we have 1 index
    if yeard == yearf and monthd == monthf :
        #fiiling the table of indices to ask for stats
        index_tab = []
        index_tab.append(yeard+ "." + str(monthd))
        #fiiling the table of queries to ask for stats
        queries = []
        query = json.dumps(
                            {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          
          "filter": {
            "range": {
              "@timestamp": {
                "gt": gt_str,
                "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "profile"
          }
        }
      }
    }
  }
})
        queries.append(query)
    #if we have more then 1 index
    else:
        #fiiling the table of queries to ask for stats
        index_tab = []
        if yeard != yearf:
            for i in range(int(monthd),13):
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
            for i in range(1,int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yearf+ "." + moth_str)
        else:
            for i in range(int(monthd),int(monthf)+1) :
                if 1 <= i <= 9:
                    moth_str = "0" + str(i)
                else:
                    moth_str = str(i)
                index_tab.append(yeard+ "." + moth_str)
    

        #fiiling the table of queries to ask for stats
        i = 0
        queries = []
        while i < len(index_tab):
            if (i == 0):
                query = json.dumps(
{
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "filter": {
            "range": {
              "@timestamp": {
                 "gt": gt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "profile"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            elif (i == len(index_tab)-1):
                query = json.dumps(
                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
          "filter": {
            "range": {
              "@timestamp": {
                 "lt": lt_str
              }
            }
          }
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "profile"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
            else:
                query = json.dumps(

                        {
  "aggs": {
    "statistic": {
      "filter": {
        "bool": {
         
        }
      },
      "aggs": {
        "all_counties": {
          "terms": {
            "field": "profile"
          }
        }
      }
    }
  }
})
                queries.append(query)
                i +=1
    #now lets execute our queries each query in his appropriate index
    json_all = []
    i =  0
                
    #lancement des requetes
    while i < len(index_tab):
        print(index_tab[i])
        print(queries[i])
        response = requests.get(es_url + "statistics." + index_tab[i] + "/_search", data=queries[i], headers=headers)
        response.status_code = status.HTTP_200_OK
        results = json.loads(response.text)
        #print ("kkkkkkk "+ str(results['aggregations']['statistic']['all_counties']['buckets'][0]['doc_count']))
        json_all.append(results)
        i +=1
    
    #traitement des resultats
    i = 0
    profiles2 = {
        "sum": 0
    }
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        #initiate profiles2.keys
        while j < len(backets):
            print("keyyyy"+backets[j]['key'])
            profiles2[backets[j]['key']] = 0
            j +=1
        i +=1
    print("lissst"+ str(profiles2))
    i = 0
    while i < len(json_all):
        backets = json_all[i]['aggregations']['statistic']['all_counties']['buckets']
        j = 0
        #initiate profiles2.keys
        while j < len(backets):
            for key in profiles2.keys():
                county_key = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['key']
                county_val = json_all[i]['aggregations']['statistic']['all_counties']['buckets'][j]['doc_count']
                if (key == county_key):
                    profiles2[key] = profiles2[key] + int(county_val)
            j +=1
        i +=1
    
    #on calcule la somme
    for key in profiles2.keys():
        if(key != "sum"):
            profiles2["sum"] += profiles2[key] 
    
    #on calcule les pourcentages
    for key in profiles2.keys():
        if(key != "sum" and profiles2["sum"] !=0):
            profiles2[key] = (profiles2[key]/profiles2["sum"])*100







    
    
   


    
    return json.dumps({"this_week":profiles1,
    "previous_week":profiles2,
    })



@app.route("/researchnumber",  methods=['GET'])
def researchnumber():
    today = datetime.today()
    year = today.year
    month = today.month
    day = today.day
    if 1 <= month <= 9:
        moth_str = "0" + str(month)
    else:
        moth_str = str(month)
    index = "statistics." + str(year) + "." + moth_str
    print(index)
  
    return json.dumps(str(today.month))


if __name__ == '__main__':
    app.run(debug=True)