from app.csv_handler import extractDataPoints

data1={
  "AIresponse": "The data shows monthly OCREVUS sales figures over several years, along with month-over-month percentage changes in sales: 1. **Volatility**: The month-over-month sales changes are highly volatile. For instance, a peak in sales increase happens in May 2020 with a 205.56% jump, and similarly high spikes are also seen in November 2021 (122.24%) and October 2022 and 2023 (33.69% and 33.69%, respectively). These months may reflect strategic launches, market conditions, or external events affecting sales. 2. **Notable Decreases**: December 2019 saw a significant decrease in sales (-38.44%), which is mirrored in multiple Decembers following (2020, 2021, and 2023), all showing double-digit percentage drops. This pattern suggests a recurring seasonal trend where sales dwindle towards the end of the year. 3. **Strong Recovery and Growth Periods**: Despite periodic drops, the sales also demonstrate significant recovery and growth phases. For instance, after a 59.27% drop in April 2020, sales climbed by 205.56% the following month. Similarly, after a large decline of 35.86% in July 2022, there was an increase of 49.87% in August 2022. 4. **General Growth Trend**: Looking at the starting and ending points, OCREVUS sales grew from 156,219.59 in January 2019 to 2,841,220.34 in September 2023, showing an overall substantial increase over the years despite the monthly fluctuations. The data, therefore, illustrates a significant degree of variability in monthly sales changes, likely influenced by external factors, marketing efforts, pricing changes, or other industry dynamics. Moreover, the recurring declines in December point to possible seasonal impacts necessitating strategic planning for this period.",
  "visuals": [
    {
      "type": "table",
      "text": "The table shows the year over year comparison of the OCREVUS_sales column.",
      "name":"data1_table",
      "data_points": [
        {
          "month": "2019-1",
          "OCREVUS_sales": 156219.59,
          "MoM_change": "NaN"
        },
        {
          "month": "2019-10",
          "OCREVUS_sales": 1274309.06,
          "MoM_change": 715.716556
        },
        {
          "month": "2019-11",
          "OCREVUS_sales": 1098103.0,
          "MoM_change": -13.827576
        },
        {
          "month": "2019-12",
          "OCREVUS_sales": 675975.81,
          "MoM_change": -38.441493
        },
        {
          "month": "2019-2",
          "OCREVUS_sales": 264847.66,
          "MoM_change": -60.81995
        },
        {
          "month": "2019-3",
          "OCREVUS_sales": 397459.56,
          "MoM_change": 50.071011
        },
        {
          "month": "2019-4",
          "OCREVUS_sales": 739935.88,
          "MoM_change": 86.166331
        },
        {
          "month": "2019-5",
          "OCREVUS_sales": 842142.37,
          "MoM_change": 13.812885
        },
        {
          "month": "2019-6",
          "OCREVUS_sales": 449409.28,
          "MoM_change": -46.634999
        },
        {
          "month": "2019-7",
          "OCREVUS_sales": 1152859.3,
          "MoM_change": 156.527702
        },
        {
          "month": "2019-8",
          "OCREVUS_sales": 656063.09,
          "MoM_change": -43.092527
        },
        {
          "month": "2019-9",
          "OCREVUS_sales": 969047.78,
          "MoM_change": 47.706493
        },
        {
          "month": "2020-1",
          "OCREVUS_sales": 1618711.83,
          "MoM_change": 67.041488
        },
        {
          "month": "2020-10",
          "OCREVUS_sales": 925739.14,
          "MoM_change": -42.810133
        },
        {
          "month": "2020-11",
          "OCREVUS_sales": 1649385.48,
          "MoM_change": 78.169574
        },
        {
          "month": "2020-12",
          "OCREVUS_sales": 2387128.96,
          "MoM_change": 44.728385
        },
        {
          "month": "2020-2",
          "OCREVUS_sales": 1207422.02,
          "MoM_change": -49.419489
        },
        {
          "month": "2020-3",
          "OCREVUS_sales": 911831.28,
          "MoM_change": -24.481145
        },
        {
          "month": "2020-4",
          "OCREVUS_sales": 371382.02,
          "MoM_change": -59.270752
        },
        {
          "month": "2020-5",
          "OCREVUS_sales": 1134788.26,
          "MoM_change": 205.558212
        },
        {
          "month": "2020-6",
          "OCREVUS_sales": 2298537.87,
          "MoM_change": 102.552137
        },
        {
          "month": "2020-7",
          "OCREVUS_sales": 1758483.6,
          "MoM_change": -23.495557
        },
        {
          "month": "2020-8",
          "OCREVUS_sales": 1391629.36,
          "MoM_change": -20.861965
        },
        {
          "month": "2020-9",
          "OCREVUS_sales": 1349422.29,
          "MoM_change": -3.032925
        },
        {
          "month": "2021-1",
          "OCREVUS_sales": 1182209.75,
          "MoM_change": -12.391417
        },
        {
          "month": "2021-10",
          "OCREVUS_sales": 1368353.53,
          "MoM_change": 15.745411
        },
        {
          "month": "2021-11",
          "OCREVUS_sales": 3041064.93,
          "MoM_change": 122.242634
        },
        {
          "month": "2021-12",
          "OCREVUS_sales": 2318659.15,
          "MoM_change": -23.755026
        },
        {
          "month": "2021-2",
          "OCREVUS_sales": 1853161.04,
          "MoM_change": -20.076177
        },
        {
          "month": "2021-3",
          "OCREVUS_sales": 1898244.18,
          "MoM_change": 2.43277
        },
        {
          "month": "2021-4",
          "OCREVUS_sales": 1447046.29,
          "MoM_change": -23.769223
        },
        {
          "month": "2021-5",
          "OCREVUS_sales": 1842746.48,
          "MoM_change": 27.345372
        },
        {
          "month": "2021-6",
          "OCREVUS_sales": 1740526.94,
          "MoM_change": -5.54713
        },
        {
          "month": "2021-7",
          "OCREVUS_sales": 2097171.93,
          "MoM_change": 20.490633
        },
        {
          "month": "2021-8",
          "OCREVUS_sales": 2055308.3,
          "MoM_change": -1.996194
        },
        {
          "month": "2021-9",
          "OCREVUS_sales": 2060055.15,
          "MoM_change": 0.230956
        },
        {
          "month": "2022-1",
          "OCREVUS_sales": 1908640.19,
          "MoM_change": -7.350044
        },
        {
          "month": "2022-10",
          "OCREVUS_sales": 2551731.35,
          "MoM_change": 33.693682
        },
        {
          "month": "2022-11",
          "OCREVUS_sales": 2647694.18,
          "MoM_change": 3.760695
        },
        {
          "month": "2022-12",
          "OCREVUS_sales": 2398444.47,
          "MoM_change": -9.413841
        },
        {
          "month": "2022-2",
          "OCREVUS_sales": 2396084.47,
          "MoM_change": -0.098397
        },
        {
          "month": "2022-3",
          "OCREVUS_sales": 2267417.9,
          "MoM_change": -5.369868
        },
        {
          "month": "2022-4",
          "OCREVUS_sales": 2305274.65,
          "MoM_change": 1.669597
        },
        {
          "month": "2022-5",
          "OCREVUS_sales": 2302609.49,
          "MoM_change": -0.115611
        },
        {
          "month": "2022-6",
          "OCREVUS_sales": 2867074.62,
          "MoM_change": 24.514149
        },
        {
          "month": "2022-7",
          "OCREVUS_sales": 1838988.59,
          "MoM_change": -35.858363
        },
        {
          "month": "2022-8",
          "OCREVUS_sales": 2756153.26,
          "MoM_change": 49.87332
        },
        {
          "month": "2022-9",
          "OCREVUS_sales": 2266251.3,
          "MoM_change": -17.774845
        },
        {
          "month": "2023-1",
          "OCREVUS_sales": 2286183.05,
          "MoM_change": 0.879503
        },
        {
          "month": "2023-10",
          "OCREVUS_sales": 3056326.8,
          "MoM_change": 33.68688
        },
        {
          "month": "2023-11",
          "OCREVUS_sales": 2921860.41,
          "MoM_change": -4.399608
        },
        {
          "month": "2023-12",
          "OCREVUS_sales": 2478129.52,
          "MoM_change": -15.186588
        },
        {
          "month": "2023-2",
          "OCREVUS_sales": 2674439.42,
          "MoM_change": 7.921697
        },
        {
          "month": "2023-3",
          "OCREVUS_sales": 2988353.68,
          "MoM_change": 11.737572
        },
        {
          "month": "2023-4",
          "OCREVUS_sales": 1876893.98,
          "MoM_change": -37.193044
        },
        {
          "month": "2023-5",
          "OCREVUS_sales": 3442630.11,
          "MoM_change": 83.421661
        },
        {
          "month": "2023-6",
          "OCREVUS_sales": 3099434.15,
          "MoM_change": -9.969005
        },
        {
          "month": "2023-7",
          "OCREVUS_sales": 2479052.67,
          "MoM_change": -20.015959
        },
        {
          "month": "2023-8",
          "OCREVUS_sales": 2609103.75,
          "MoM_change": 5.245999
        },
        {
          "month": "2023-9",
          "OCREVUS_sales": 2841220.34,
          "MoM_change": 8.896411
        }
      ]
    }
  ]
}

data2={
  "AIresponse": "The total sum of OCREVUS_sales and roc_sls_cer_cm5_ocr is 109845374.57 and 108654427.9 respectively. This represents the total sales for two specific items (OCREVUS and another item, likely a product or service) in your dataset. Keep in mind that this number reflects only the specified columns and does not account for any other data points within the dataset.  Since you haven't shared information about trends, comparisons, outliers, or anomalies within the data, I can't make specific observations on those topics. However, if your dataset contains additional context, you may be able to identify interesting insights by comparing this total with other sales figures, average sale amounts, or sales over a given time period.",
  "visuals":False
}

data3={
    "AIresponse": "This table provides a month-wise comparison of OCREVUS_Sales and roc_sls_cer_cm5_ocr from the year 2020 to 2022.  For OCREVUS_Sales: - There is an initial increase in sales from January to March, followed by a drop in April, then another increase until August. - After August, there is a steady decrease in sales until December 2021, with a slight recovery in the final month of 2022.  For roc_sls_cer_cm5_ocr: - There's an overall trend of increasing values from January to June, then a decrease through October and November, followed by another increase in December 2021 and the first quarter of 2022.",
    "visuals": [
                 {
                "type": "area",
                "name":"data3_linegraph",
"data_points": [
        {
            "OCREVUS_sales - sum": 1274309.06,
            "OCREVUS_sales - sum2": 2074309.06,
            "Group - Group - year; Group - month": "2019; 10.0"
        },
        {
            "OCREVUS_sales - sum": 2387128.96,
            "OCREVUS_sales - sum2": 3074309.06,
            "Group - Group - year; Group - month": "2020; 12.0"
        },
        {
            "OCREVUS_sales - sum": 3041064.9299999997,
            "OCREVUS_sales - sum2": 1074309.06,
            "Group - Group - year; Group - month": "2021; 11.0"
        },
        {
            "OCREVUS_sales - sum": 2867074.62,
            "OCREVUS_sales - sum2": 574309.06,
            "Group - Group - year; Group - month": "2022; 6.0"
        },
        {
            "OCREVUS_sales - sum": 3442630.1100000003,
            "OCREVUS_sales - sum2": 3574309.06,
            "Group - Group - year; Group - month": "2023; 5.0"
        }
    ],
                "text": "This graph provides a month-wise comparison of OCREVUS_Sales and roc_sls_cer_cm5_ocr from the year 2020 to 2022.  For OCREVUS_Sales: - There is an initial increase in sales from January to March, followed by a drop in April, then another increase until August. - After August, there is a steady decrease in sales until December 2021, with a slight recovery in the final month of 2022.  For roc_sls_cer_cm5_ocr: - There's an overall trend of increasing values from January to June, then a decrease through October and November, followed by another increase in December 2021 and the first quarter of 2022."
                 },
                 {
                "type":"table",
                "name":"data3_table",
                "text": "This table provides a month-wise comparison of OCREVUS_Sales and roc_sls_cer_cm5_ocr from the year 2020 to 2022. There's an overall trend of increasing values from January to June, then a decrease through October and November, followed by another increase in December 2021 and the first quarter of 2022.",
                       "data_points": [
        {
          "month": "2019-1",
          "OCREVUS_sales": 156219.59,
          "MoM_change": "NaN"
        },
        {
          "month": "2019-10",
          "OCREVUS_sales": 1274309.06,
          "MoM_change": 715.716556
        },
        {
          "month": "2019-11",
          "OCREVUS_sales": 1098103.0,
          "MoM_change": -13.827576
        },
        {
          "month": "2019-12",
          "OCREVUS_sales": 675975.81,
          "MoM_change": -38.441493
        },
        {
          "month": "2019-2",
          "OCREVUS_sales": 264847.66,
          "MoM_change": -60.81995
        },
        {
          "month": "2019-3",
          "OCREVUS_sales": 397459.56,
          "MoM_change": 50.071011
        },
        {
          "month": "2019-4",
          "OCREVUS_sales": 739935.88,
          "MoM_change": 86.166331
        },
        {
          "month": "2019-5",
          "OCREVUS_sales": 842142.37,
          "MoM_change": 13.812885
        },
        {
          "month": "2019-6",
          "OCREVUS_sales": 449409.28,
          "MoM_change": -46.634999
        },
        {
          "month": "2019-7",
          "OCREVUS_sales": 1152859.3,
          "MoM_change": 156.527702
        },
        {
          "month": "2019-8",
          "OCREVUS_sales": 656063.09,
          "MoM_change": -43.092527
        },
        {
          "month": "2019-9",
          "OCREVUS_sales": 969047.78,
          "MoM_change": 47.706493
        },
        {
          "month": "2020-1",
          "OCREVUS_sales": 1618711.83,
          "MoM_change": 67.041488
        },
        {
          "month": "2020-10",
          "OCREVUS_sales": 925739.14,
          "MoM_change": -42.810133
        },
        {
          "month": "2020-11",
          "OCREVUS_sales": 1649385.48,
          "MoM_change": 78.169574
        },
        {
          "month": "2020-12",
          "OCREVUS_sales": 2387128.96,
          "MoM_change": 44.728385
        },
        {
          "month": "2020-2",
          "OCREVUS_sales": 1207422.02,
          "MoM_change": -49.419489
        },
        {
          "month": "2020-3",
          "OCREVUS_sales": 911831.28,
          "MoM_change": -24.481145
        },
        {
          "month": "2020-4",
          "OCREVUS_sales": 371382.02,
          "MoM_change": -59.270752
        },
        {
          "month": "2020-5",
          "OCREVUS_sales": 1134788.26,
          "MoM_change": 205.558212
        },
        {
          "month": "2020-6",
          "OCREVUS_sales": 2298537.87,
          "MoM_change": 102.552137
        },
        {
          "month": "2020-7",
          "OCREVUS_sales": 1758483.6,
          "MoM_change": -23.495557
        },
        {
          "month": "2020-8",
          "OCREVUS_sales": 1391629.36,
          "MoM_change": -20.861965
        },
        {
          "month": "2020-9",
          "OCREVUS_sales": 1349422.29,
          "MoM_change": -3.032925
        },
        {
          "month": "2021-1",
          "OCREVUS_sales": 1182209.75,
          "MoM_change": -12.391417
        },
        {
          "month": "2021-10",
          "OCREVUS_sales": 1368353.53,
          "MoM_change": 15.745411
        },
        {
          "month": "2021-11",
          "OCREVUS_sales": 3041064.93,
          "MoM_change": 122.242634
        },
        {
          "month": "2021-12",
          "OCREVUS_sales": 2318659.15,
          "MoM_change": -23.755026
        },
        {
          "month": "2021-2",
          "OCREVUS_sales": 1853161.04,
          "MoM_change": -20.076177
        },
        {
          "month": "2021-3",
          "OCREVUS_sales": 1898244.18,
          "MoM_change": 2.43277
        },
        {
          "month": "2021-4",
          "OCREVUS_sales": 1447046.29,
          "MoM_change": -23.769223
        },
        {
          "month": "2021-5",
          "OCREVUS_sales": 1842746.48,
          "MoM_change": 27.345372
        },
        {
          "month": "2021-6",
          "OCREVUS_sales": 1740526.94,
          "MoM_change": -5.54713
        },
        {
          "month": "2021-7",
          "OCREVUS_sales": 2097171.93,
          "MoM_change": 20.490633
        },
        {
          "month": "2021-8",
          "OCREVUS_sales": 2055308.3,
          "MoM_change": -1.996194
        },
        {
          "month": "2021-9",
          "OCREVUS_sales": 2060055.15,
          "MoM_change": 0.230956
        },
        {
          "month": "2022-1",
          "OCREVUS_sales": 1908640.19,
          "MoM_change": -7.350044
        },
        {
          "month": "2022-10",
          "OCREVUS_sales": 2551731.35,
          "MoM_change": 33.693682
        },
        {
          "month": "2022-11",
          "OCREVUS_sales": 2647694.18,
          "MoM_change": 3.760695
        },
        {
          "month": "2022-12",
          "OCREVUS_sales": 2398444.47,
          "MoM_change": -9.413841
        },
        {
          "month": "2022-2",
          "OCREVUS_sales": 2396084.47,
          "MoM_change": -0.098397
        },
        {
          "month": "2022-3",
          "OCREVUS_sales": 2267417.9,
          "MoM_change": -5.369868
        },
        {
          "month": "2022-4",
          "OCREVUS_sales": 2305274.65,
          "MoM_change": 1.669597
        },
        {
          "month": "2022-5",
          "OCREVUS_sales": 2302609.49,
          "MoM_change": -0.115611
        },
        {
          "month": "2022-6",
          "OCREVUS_sales": 2867074.62,
          "MoM_change": 24.514149
        },
        {
          "month": "2022-7",
          "OCREVUS_sales": 1838988.59,
          "MoM_change": -35.858363
        },
        {
          "month": "2022-8",
          "OCREVUS_sales": 2756153.26,
          "MoM_change": 49.87332
        },
        {
          "month": "2022-9",
          "OCREVUS_sales": 2266251.3,
          "MoM_change": -17.774845
        },
        {
          "month": "2023-1",
          "OCREVUS_sales": 2286183.05,
          "MoM_change": 0.879503
        },
        {
          "month": "2023-10",
          "OCREVUS_sales": 3056326.8,
          "MoM_change": 33.68688
        },
        {
          "month": "2023-11",
          "OCREVUS_sales": 2921860.41,
          "MoM_change": -4.399608
        },
        {
          "month": "2023-12",
          "OCREVUS_sales": 2478129.52,
          "MoM_change": -15.186588
        },
        {
          "month": "2023-2",
          "OCREVUS_sales": 2674439.42,
          "MoM_change": 7.921697
        },
        {
          "month": "2023-3",
          "OCREVUS_sales": 2988353.68,
          "MoM_change": 11.737572
        },
        {
          "month": "2023-4",
          "OCREVUS_sales": 1876893.98,
          "MoM_change": -37.193044
        },
        {
          "month": "2023-5",
          "OCREVUS_sales": 3442630.11,
          "MoM_change": 83.421661
        },
        {
          "month": "2023-6",
          "OCREVUS_sales": 3099434.15,
          "MoM_change": -9.969005
        },
        {
          "month": "2023-7",
          "OCREVUS_sales": 2479052.67,
          "MoM_change": -20.015959
        },
        {
          "month": "2023-8",
          "OCREVUS_sales": 2609103.75,
          "MoM_change": 5.245999
        },
        {
          "month": "2023-9",
          "OCREVUS_sales": 2841220.34,
          "MoM_change": 8.896411
        }
      ]
    }
        
          ]
}


notimplimented={
  "AIresponse": "We apologize, but this feature is still under development.",
  "visuals":False
}

csvTestData={"AIresponse":False,"visuals":[{"type":"table","text":"Testing the csv download route","name":"sampleDownloadingFile.csv","data_points":extractDataPoints("sampleDownloadingFile.csv")}]}



forcastTest={
  "AIresponse":False,
  "visuals":[
    {
      "type":"forecast",
      "text":"Testing the forecast download route",
      "name":"sampleForecast",
      "data_points":[
    {
      "timestamp": "2018-12-31",
      "actual": 8386.2
    },
    {
      "timestamp": "2019-01-07",
      "actual": 21572.93
    },
    {
      "timestamp": "2019-01-14",
      "actual": 34637.9
    },
    {
      "timestamp": "2019-01-21",
      "actual": 47581.11
    },
    {
      "timestamp": "2019-01-28",
      "actual": 44041.45
    },
    {
      "timestamp": "2019-02-04",
      "actual": 53301.2
    },
    {
      "timestamp": "2019-02-11",
      "actual": 62472.17
    },
    {
      "timestamp": "2019-02-18",
      "actual": 71554.37
    },
    {
      "timestamp": "2019-02-25",
      "actual": 77519.92
    },
    {
      "timestamp": "2019-03-04",
      "actual": 86089.83
    },
    {
      "timestamp": "2019-03-11",
      "actual": 94646.72
    },
    {
      "timestamp": "2019-03-18",
      "actual": 103625.23
    },
    {
      "timestamp": "2019-03-25",
      "actual": 113097.78
    },
    {
      "timestamp": "2019-04-01",
      "actual": 120870.87
    },
    {
      "timestamp": "2019-04-08",
      "actual": 131145.06
    },
    {
      "timestamp": "2019-04-15",
      "actual": 144574.62
    },
    {
      "timestamp": "2019-04-22",
      "actual": 163829.64
    },
    {
      "timestamp": "2019-04-29",
      "actual": 179515.69
    },
    {
      "timestamp": "2019-05-06",
      "actual": 208884.72
    },
    {
      "timestamp": "2019-05-13",
      "actual": 232432.75
    },
    {
      "timestamp": "2019-05-20",
      "actual": 238803.0
    },
    {
      "timestamp": "2019-05-27",
      "actual": 162021.9
    },
    {
      "timestamp": "2019-06-03",
      "actual": 142134.51
    },
    {
      "timestamp": "2019-06-10",
      "actual": 113533.31
    },
    {
      "timestamp": "2019-06-17",
      "actual": 97178.38
    },
    {
      "timestamp": "2019-06-24",
      "actual": 96563.08
    },
    {
      "timestamp": "2019-07-01",
      "actual": 173077.66
    },
    {
      "timestamp": "2019-07-08",
      "actual": 220906.32
    },
    {
      "timestamp": "2019-07-15",
      "actual": 268714.27
    },
    {
      "timestamp": "2019-07-22",
      "actual": 292089.72
    },
    {
      "timestamp": "2019-07-29",
      "actual": 198071.33
    },
    {
      "timestamp": "2019-08-05",
      "actual": 180723.62
    },
    {
      "timestamp": "2019-08-12",
      "actual": 157999.6
    },
    {
      "timestamp": "2019-08-19",
      "actual": 141151.27
    },
    {
      "timestamp": "2019-08-26",
      "actual": 176188.6
    },
    {
      "timestamp": "2019-09-02",
      "actual": 169290.17
    },
    {
      "timestamp": "2019-09-09",
      "actual": 170616.49
    },
    {
      "timestamp": "2019-09-16",
      "actual": 181801.91
    },
    {
      "timestamp": "2019-09-23",
      "actual": 203118.83
    },
    {
      "timestamp": "2019-09-30",
      "actual": 244220.38
    },
    {
      "timestamp": "2019-10-07",
      "actual": 287511.41
    },
    {
      "timestamp": "2019-10-14",
      "actual": 329291.1
    },
    {
      "timestamp": "2019-10-21",
      "actual": 357499.66
    },
    {
      "timestamp": "2019-10-28",
      "actual": 300006.89
    },
    {
      "timestamp": "2019-11-04",
      "actual": 300866.51
    },
    {
      "timestamp": "2019-11-11",
      "actual": 292537.96
    },
    {
      "timestamp": "2019-11-18",
      "actual": 276773.73
    },
    {
      "timestamp": "2019-11-25",
      "actual": 227924.8
    },
    {
      "timestamp": "2019-12-02",
      "actual": 200388.0
    },
    {
      "timestamp": "2019-12-09",
      "actual": 169209.94
    },
    {
      "timestamp": "2019-12-16",
      "actual": 152644.35
    },
    {
      "timestamp": "2019-12-23",
      "actual": 153733.52
    },
    {
      "timestamp": "2019-12-30",
      "actual": 246401.79
    },
    {
      "timestamp": "2020-01-06",
      "actual": 298401.08
    },
    {
      "timestamp": "2020-01-13",
      "actual": 354134.38
    },
    {
      "timestamp": "2020-01-20",
      "actual": 392114.05
    },
    {
      "timestamp": "2020-01-27",
      "actual": 327660.53
    },
    {
      "timestamp": "2020-02-03",
      "actual": 329625.19
    },
    {
      "timestamp": "2020-02-10",
      "actual": 322605.44
    },
    {
      "timestamp": "2020-02-17",
      "actual": 311724.56
    },
    {
      "timestamp": "2020-02-24",
      "actual": 243466.83
    },
    {
      "timestamp": "2020-03-02",
      "actual": 228215.92
    },
    {
      "timestamp": "2020-03-09",
      "actual": 209802.89
    },
    {
      "timestamp": "2020-03-16",
      "actual": 188247.27
    },
    {
      "timestamp": "2020-03-23",
      "actual": 163552.31
    },
    {
      "timestamp": "2020-03-30",
      "actual": 122012.89
    },
    {
      "timestamp": "2020-04-06",
      "actual": 94167.04
    },
    {
      "timestamp": "2020-04-13",
      "actual": 71560.71
    },
    {
      "timestamp": "2020-04-20",
      "actual": 62255.74
    },
    {
      "timestamp": "2020-04-27",
      "actual": 143398.53
    },
    {
      "timestamp": "2020-05-04",
      "actual": 180838.44
    },
    {
      "timestamp": "2020-05-11",
      "actual": 244179.6
    },
    {
      "timestamp": "2020-05-18",
      "actual": 316089.82
    },
    {
      "timestamp": "2020-05-25",
      "actual": 393680.4
    },
    {
      "timestamp": "2020-06-01",
      "actual": 364725.54
    },
    {
      "timestamp": "2020-06-08",
      "actual": 432746.76
    },
    {
      "timestamp": "2020-06-15",
      "actual": 494417.6
    },
    {
      "timestamp": "2020-06-22",
      "actual": 539043.94
    },
    {
      "timestamp": "2020-06-29",
      "actual": 467604.03
    },
    {
      "timestamp": "2020-07-06",
      "actual": 476299.89
    },
    {
      "timestamp": "2020-07-13",
      "actual": 471629.12
    },
    {
      "timestamp": "2020-07-20",
      "actual": 454290.95
    },
    {
      "timestamp": "2020-07-27",
      "actual": 356263.64
    },
    {
      "timestamp": "2020-08-03",
      "actual": 320432.04
    },
    {
      "timestamp": "2020-08-10",
      "actual": 277373.6
    },
    {
      "timestamp": "2020-08-17",
      "actual": 247546.51
    },
    {
      "timestamp": "2020-08-24",
      "actual": 234360.46
    },
    {
      "timestamp": "2020-08-31",
      "actual": 311916.75
    },
    {
      "timestamp": "2020-09-07",
      "actual": 338274.55
    },
    {
      "timestamp": "2020-09-14",
      "actual": 365066.75
    },
    {
      "timestamp": "2020-09-21",
      "actual": 370901.51
    },
    {
      "timestamp": "2020-09-28",
      "actual": 275179.48
    },
    {
      "timestamp": "2020-10-05",
      "actual": 247273.08
    },
    {
      "timestamp": "2020-10-12",
      "actual": 215601.07
    },
    {
      "timestamp": "2020-10-19",
      "actual": 192607.51
    },
    {
      "timestamp": "2020-10-26",
      "actual": 270257.48
    },
    {
      "timestamp": "2020-11-02",
      "actual": 261713.38
    },
    {
      "timestamp": "2020-11-09",
      "actual": 268525.03
    },
    {
      "timestamp": "2020-11-16",
      "actual": 303897.68
    },
    {
      "timestamp": "2020-11-23",
      "actual": 370032.18
    },
    {
      "timestamp": "2020-11-30",
      "actual": 445217.21
    },
    {
      "timestamp": "2020-12-07",
      "actual": 566939.55
    },
    {
      "timestamp": "2020-12-14",
      "actual": 673220.31
    },
    {
      "timestamp": "2020-12-21",
      "actual": 719286.38
    },
    {
      "timestamp": "2020-12-28",
      "actual": 427682.72
    },
    {
      "timestamp": "2021-01-04",
      "actual": 382579.64
    },
    {
      "timestamp": "2021-01-11",
      "actual": 309175.67
    },
    {
      "timestamp": "2021-01-18",
      "actual": 256795.27
    },
    {
      "timestamp": "2021-01-25",
      "actual": 233659.17
    },
    {
      "timestamp": "2021-02-01",
      "actual": 380914.81
    },
    {
      "timestamp": "2021-02-08",
      "actual": 437078.81
    },
    {
      "timestamp": "2021-02-15",
      "actual": 501038.37
    },
    {
      "timestamp": "2021-02-22",
      "actual": 534129.05
    },
    {
      "timestamp": "2021-03-01",
      "actual": 420306.47
    },
    {
      "timestamp": "2021-03-08",
      "actual": 397857.45
    },
    {
      "timestamp": "2021-03-15",
      "actual": 367613.36
    },
    {
      "timestamp": "2021-03-22",
      "actual": 345969.25
    },
    {
      "timestamp": "2021-03-29",
      "actual": 366497.65
    },
    {
      "timestamp": "2021-04-05",
      "actual": 361605.35
    },
    {
      "timestamp": "2021-04-12",
      "actual": 361247.74
    },
    {
      "timestamp": "2021-04-19",
      "actual": 360492.3
    },
    {
      "timestamp": "2021-04-26",
      "actual": 363700.9
    },
    {
      "timestamp": "2021-05-03",
      "actual": 362130.95
    },
    {
      "timestamp": "2021-05-10",
      "actual": 360556.02
    },
    {
      "timestamp": "2021-05-17",
      "actual": 361362.29
    },
    {
      "timestamp": "2021-05-24",
      "actual": 364947.44
    },
    {
      "timestamp": "2021-05-31",
      "actual": 393749.78
    },
    {
      "timestamp": "2021-06-07",
      "actual": 403445.21
    },
    {
      "timestamp": "2021-06-14",
      "actual": 418830.1
    },
    {
      "timestamp": "2021-06-21",
      "actual": 442647.11
    },
    {
      "timestamp": "2021-06-28",
      "actual": 475604.52
    },
    {
      "timestamp": "2021-07-05",
      "actual": 516346.43
    },
    {
      "timestamp": "2021-07-12",
      "actual": 550384.47
    },
    {
      "timestamp": "2021-07-19",
      "actual": 562570.1
    },
    {
      "timestamp": "2021-07-26",
      "actual": 467870.93
    },
    {
      "timestamp": "2021-08-02",
      "actual": 441199.13
    },
    {
      "timestamp": "2021-08-09",
      "actual": 400927.17
    },
    {
      "timestamp": "2021-08-16",
      "actual": 376404.11
    },
    {
      "timestamp": "2021-08-23",
      "actual": 372521.47
    },
    {
      "timestamp": "2021-08-30",
      "actual": 464256.42
    },
    {
      "timestamp": "2021-09-06",
      "actual": 508857.71
    },
    {
      "timestamp": "2021-09-13",
      "actual": 550810.57
    },
    {
      "timestamp": "2021-09-20",
      "actual": 562850.72
    },
    {
      "timestamp": "2021-09-27",
      "actual": 437536.15
    },
    {
      "timestamp": "2021-10-04",
      "actual": 399171.69
    },
    {
      "timestamp": "2021-10-11",
      "actual": 343706.3
    },
    {
      "timestamp": "2021-10-18",
      "actual": 312627.06
    },
    {
      "timestamp": "2021-10-25",
      "actual": 312848.48
    },
    {
      "timestamp": "2021-11-01",
      "actual": 476278.21
    },
    {
      "timestamp": "2021-11-08",
      "actual": 563164.59
    },
    {
      "timestamp": "2021-11-15",
      "actual": 658077.84
    },
    {
      "timestamp": "2021-11-22",
      "actual": 725754.77
    },
    {
      "timestamp": "2021-11-29",
      "actual": 617789.52
    },
    {
      "timestamp": "2021-12-06",
      "actual": 628436.24
    },
    {
      "timestamp": "2021-12-13",
      "actual": 619668.52
    },
    {
      "timestamp": "2021-12-20",
      "actual": 594032.76
    },
    {
      "timestamp": "2021-12-27",
      "actual": 476521.63
    },
    {
      "timestamp": "2022-01-03",
      "actual": 425224.32
    },
    {
      "timestamp": "2022-01-10",
      "actual": 364773.92
    },
    {
      "timestamp": "2022-01-17",
      "actual": 327695.87
    },
    {
      "timestamp": "2022-01-24",
      "actual": 319411.09
    },
    {
      "timestamp": "2022-01-31",
      "actual": 471534.99
    },
    {
      "timestamp": "2022-02-07",
      "actual": 539926.16
    },
    {
      "timestamp": "2022-02-14",
      "actual": 614718.01
    },
    {
      "timestamp": "2022-02-21",
      "actual": 662369.32
    },
    {
      "timestamp": "2022-02-28",
      "actual": 579070.98
    },
    {
      "timestamp": "2022-03-07",
      "actual": 573449.04
    },
    {
      "timestamp": "2022-03-14",
      "actual": 560843.53
    },
    {
      "timestamp": "2022-03-21",
      "actual": 557285.57
    },
    {
      "timestamp": "2022-03-28",
      "actual": 575839.76
    },
    {
      "timestamp": "2022-04-04",
      "actual": 590714.41
    },
    {
      "timestamp": "2022-04-11",
      "actual": 600968.05
    },
    {
      "timestamp": "2022-04-18",
      "actual": 592722.1
    },
    {
      "timestamp": "2022-04-25",
      "actual": 520870.09
    },
    {
      "timestamp": "2022-05-02",
      "actual": 479230.84
    },
    {
      "timestamp": "2022-05-09",
      "actual": 427090.98
    },
    {
      "timestamp": "2022-05-16",
      "actual": 403598.33
    },
    {
      "timestamp": "2022-05-23",
      "actual": 415277.51
    },
    {
      "timestamp": "2022-05-30",
      "actual": 577411.83
    },
    {
      "timestamp": "2022-06-06",
      "actual": 679896.22
    },
    {
      "timestamp": "2022-06-13",
      "actual": 778823.0
    },
    {
      "timestamp": "2022-06-20",
      "actual": 826688.68
    },
    {
      "timestamp": "2022-06-27",
      "actual": 581666.72
    },
    {
      "timestamp": "2022-07-04",
      "actual": 543343.16
    },
    {
      "timestamp": "2022-07-11",
      "actual": 476273.73
    },
    {
      "timestamp": "2022-07-18",
      "actual": 424382.27
    },
    {
      "timestamp": "2022-07-25",
      "actual": 394989.43
    },
    {
      "timestamp": "2022-08-01",
      "actual": 510258.75
    },
    {
      "timestamp": "2022-08-08",
      "actual": 530775.05
    },
    {
      "timestamp": "2022-08-15",
      "actual": 562648.99
    },
    {
      "timestamp": "2022-08-22",
      "actual": 587657.54
    },
    {
      "timestamp": "2022-08-29",
      "actual": 564812.93
    },
    {
      "timestamp": "2022-09-05",
      "actual": 575327.66
    },
    {
      "timestamp": "2022-09-12",
      "actual": 578385.07
    },
    {
      "timestamp": "2022-09-19",
      "actual": 572928.73
    },
    {
      "timestamp": "2022-09-26",
      "actual": 539609.84
    },
    {
      "timestamp": "2022-10-03",
      "actual": 517904.31
    },
    {
      "timestamp": "2022-10-10",
      "actual": 491254.28
    },
    {
      "timestamp": "2022-10-17",
      "actual": 479306.99
    },
    {
      "timestamp": "2022-10-24",
      "actual": 485336.98
    },
    {
      "timestamp": "2022-10-31",
      "actual": 577928.79
    },
    {
      "timestamp": "2022-11-07",
      "actual": 625566.68
    },
    {
      "timestamp": "2022-11-14",
      "actual": 675246.32
    },
    {
      "timestamp": "2022-11-21",
      "actual": 708611.46
    },
    {
      "timestamp": "2022-11-28",
      "actual": 638269.72
    },
    {
      "timestamp": "2022-12-05",
      "actual": 638917.24
    },
    {
      "timestamp": "2022-12-12",
      "actual": 626989.99
    },
    {
      "timestamp": "2022-12-19",
      "actual": 604262.92
    },
    {
      "timestamp": "2022-12-26",
      "actual": 528274.32
    },
    {
      "timestamp": "2023-01-02",
      "actual": 487245.44
    },
    {
      "timestamp": "2023-01-09",
      "actual": 440269.95
    },
    {
      "timestamp": "2023-01-16",
      "actual": 411646.13
    },
    {
      "timestamp": "2023-01-23",
      "actual": 405423.7
    },
    {
      "timestamp": "2023-01-30",
      "actual": 541597.83
    },
    {
      "timestamp": "2023-02-06",
      "actual": 591158.81
    },
    {
      "timestamp": "2023-02-13",
      "actual": 654719.96
    },
    {
      "timestamp": "2023-02-20",
      "actual": 717504.27
    },
    {
      "timestamp": "2023-02-27",
      "actual": 711056.38
    },
    {
      "timestamp": "2023-03-06",
      "actual": 766909.83
    },
    {
      "timestamp": "2023-03-13",
      "actual": 804776.33
    },
    {
      "timestamp": "2023-03-20",
      "actual": 807377.54
    },
    {
      "timestamp": "2023-03-27",
      "actual": 609289.98
    },
    {
      "timestamp": "2023-04-03",
      "actual": 555865.47
    },
    {
      "timestamp": "2023-04-10",
      "actual": 481886.7
    },
    {
      "timestamp": "2023-04-17",
      "actual": 430438.89
    },
    {
      "timestamp": "2023-04-24",
      "actual": 408702.92
    },
    {
      "timestamp": "2023-05-01",
      "actual": 581154.03
    },
    {
      "timestamp": "2023-05-08",
      "actual": 633718.16
    },
    {
      "timestamp": "2023-05-15",
      "actual": 704723.12
    },
    {
      "timestamp": "2023-05-22",
      "actual": 771169.75
    },
    {
      "timestamp": "2023-05-29",
      "actual": 751865.05
    },
    {
      "timestamp": "2023-06-05",
      "actual": 803607.44
    },
    {
      "timestamp": "2023-06-12",
      "actual": 836170.71
    },
    {
      "timestamp": "2023-06-19",
      "actual": 834489.75
    },
    {
      "timestamp": "2023-06-26",
      "actual": 625166.25
    },
    {
      "timestamp": "2023-07-03",
      "actual": 570233.25
    },
    {
      "timestamp": "2023-07-10",
      "actual": 495184.95
    },
    {
      "timestamp": "2023-07-17",
      "actual": 440180.57
    },
    {
      "timestamp": "2023-07-24",
      "actual": 411913.35
    },
    {
      "timestamp": "2023-07-31",
      "actual": 561540.55
    },
    {
      "timestamp": "2023-08-07",
      "actual": 596032.18
    },
    {
      "timestamp": "2023-08-14",
      "actual": 646265.43
    },
    {
      "timestamp": "2023-08-21",
      "actual": 691396.62
    },
    {
      "timestamp": "2023-08-28",
      "actual": 675409.52
    },
    {
      "timestamp": "2023-09-04",
      "actual": 707661.71
    },
    {
      "timestamp": "2023-09-11",
      "actual": 727085.68
    },
    {
      "timestamp": "2023-09-18",
      "actual": 725564.52
    },
    {
      "timestamp": "2023-09-25",
      "actual": 680908.43
    },
    {
      "timestamp": "2023-10-02",
      "actual": 638867.08
    },
    {
      "timestamp": "2023-10-09",
      "actual": 585416.99
    },
    {
      "timestamp": "2023-10-16",
      "actual": 573810.27
    },
    {
      "timestamp": "2023-10-23",
      "actual": 612922.3
    },
    {
      "timestamp": "2023-10-30",
      "actual": 645310.16
    },
    {
      "timestamp": "2023-11-06",
      "actual": 774371.16
    },
    {
      "timestamp": "2023-11-13",
      "actual": 822030.78
    },
    {
      "timestamp": "2023-11-20",
      "actual": 660314.64
    },
    {
      "timestamp": "2023-11-27",
      "actual": 665143.83
    },
    {
      "timestamp": "2023-12-04",
      "actual": 646899.25
    },
    {
      "timestamp": "2023-12-11",
      "actual": 628654.67
    },
    {
      "timestamp": "2023-12-18",
      "actual": 610410.09
    },
    {
      "timestamp": "2023-12-25",
      "actual": 592165.51,
      "forecast": 592165.51,
      "lower_bound": 592165.51,
      "upper_bound": 592165.51
    },
    {
      "timestamp": "2024-01-01",
      "forecast": 550763.4375,
      "lower_bound": 527622.25,
      "upper_bound": 568042.19375
    },
    {
      "timestamp": "2024-01-08",
      "forecast": 516822.84375,
      "lower_bound": 502629.615625,
      "upper_bound": 543358.13125
    },
    {
      "timestamp": "2024-01-15",
      "forecast": 492138.8125,
      "lower_bound": 459741.09375,
      "upper_bound": 564956.7000000001
    },
    {
      "timestamp": "2024-01-22",
      "forecast": 498309.8125,
      "lower_bound": 443079.140625,
      "upper_bound": 582544.03125
    },
    {
      "timestamp": "2024-01-29",
      "forecast": 499852.671875,
      "lower_bound": 440919.4625,
      "upper_bound": 606919.5625
    },
    {
      "timestamp": "2024-02-05",
      "forecast": 518365.5,
      "lower_bound": 460049.440625,
      "upper_bound": 684057.4375
    }
  ]
    }
  ]
}

regressiontest={
  "AIresponse":False, "visuals":[
    {
      "type":"regression",
      "text":False,
      "name":"sampleregressiongraph",
      "data_points":[
    {
      "time": 0,
      "actual": 8386.2,
      "predicted": 45051.4003589262
    },
    {
      "time": 1,
      "actual": 21572.93,
      "predicted": 50851.49949331884
    },
    {
      "time": 2,
      "actual": 34637.9,
      "predicted": 56615.89500247476
    },
    {
      "time": 3,
      "actual": 47581.11,
      "predicted": 62344.586879356444
    },
    {
      "time": 4,
      "actual": 44041.45,
      "predicted": 65159.04254177203
    },
    {
      "time": 5,
      "actual": 53301.2,
      "predicted": 73061.27250648045
    },
    {
      "time": 6,
      "actual": 62472.17,
      "predicted": 80256.98020661497
    },
    {
      "time": 7,
      "actual": 71554.37,
      "predicted": 86751.96822553583
    },
    {
      "time": 8,
      "actual": 77519.92,
      "predicted": 92019.32555045419
    },
    {
      "time": 9,
      "actual": 86089.83,
      "predicted": 99417.20894314333
    },
    {
      "time": 10,
      "actual": 94646.72,
      "predicted": 106691.43372383525
    },
    {
      "time": 11,
      "actual": 103625.23,
      "predicted": 113931.79655880919
    },
    {
      "time": 12,
      "actual": 113097.78,
      "predicted": 121240.83833513073
    },
    {
      "time": 13,
      "actual": 120870.87,
      "predicted": 128867.89154321235
    },
    {
      "time": 14,
      "actual": 131145.06,
      "predicted": 136794.7935822556
    },
    {
      "time": 15,
      "actual": 144574.62,
      "predicted": 145578.9782504266
    },
    {
      "time": 16,
      "actual": 163829.64,
      "predicted": 156171.18780750356
    },
    {
      "time": 17,
      "actual": 179515.69,
      "predicted": 167856.58252083667
    },
    {
      "time": 18,
      "actual": 208884.72,
      "predicted": 183341.51320634282
    },
    {
      "time": 19,
      "actual": 232432.75,
      "predicted": 201161.80821876333
    },
    {
      "time": 20,
      "actual": 238803.0,
      "predicted": 217740.10729935183
    },
    {
      "time": 21,
      "actual": 162021.9,
      "predicted": 217422.0565103902
    },
    {
      "time": 22,
      "actual": 142134.51,
      "predicted": 210845.30802210752
    },
    {
      "time": 23,
      "actual": 113533.31,
      "predicted": 194069.42620096146
    },
    {
      "time": 24,
      "actual": 97178.38,
      "predicted": 170273.1214718839
    },
    {
      "time": 25,
      "actual": 96563.08,
      "predicted": 145247.79707562824
    },
    {
      "time": 26,
      "actual": 173077.66,
      "predicted": 147192.91917834315
    },
    {
      "time": 27,
      "actual": 220906.32,
      "predicted": 161051.82819276332
    },
    {
      "time": 28,
      "actual": 268714.27,
      "predicted": 188353.9662609971
    },
    {
      "time": 29,
      "actual": 292089.72,
      "predicted": 222646.16422055935
    },
    {
      "time": 30,
      "actual": 198071.33,
      "predicted": 240505.26293543336
    },
    {
      "time": 31,
      "actual": 180723.62,
      "predicted": 241850.47405209928
    },
    {
      "time": 32,
      "actual": 157999.6,
      "predicted": 230782.829323911
    },
    {
      "time": 33,
      "actual": 141151.27,
      "predicted": 208339.72397426586
    },
    {
      "time": 34,
      "actual": 176188.6,
      "predicted": 187948.3806220824
    },
    {
      "time": 35,
      "actual": 169290.17,
      "predicted": 182884.69802054932
    },
    {
      "time": 36,
      "actual": 170616.49,
      "predicted": 181106.47552364715
    },
    {
      "time": 37,
      "actual": 181801.91,
      "predicted": 185294.19199732493
    },
    {
      "time": 38,
      "actual": 203118.83,
      "predicted": 196196.60412678606
    },
    {
      "time": 39,
      "actual": 244220.38,
      "predicted": 208165.9386175496
    },
    {
      "time": 40,
      "actual": 287511.41,
      "predicted": 228965.4794876651
    },
    {
      "time": 41,
      "actual": 329291.1,
      "predicted": 256882.28186254553
    },
    {
      "time": 42,
      "actual": 357499.66,
      "predicted": 287794.0911852793
    },
    {
      "time": 43,
      "actual": 300006.89,
      "predicted": 304840.3275118112
    },
    {
      "time": 44,
      "actual": 300866.51,
      "predicted": 314806.50315813714
    },
    {
      "time": 45,
      "actual": 292537.96,
      "predicted": 315690.8608853017
    },
    {
      "time": 46,
      "actual": 276773.73,
      "predicted": 306451.0894264266
    },
    {
      "time": 47,
      "actual": 227924.8,
      "predicted": 283654.0227003546
    },
    {
      "time": 48,
      "actual": 200388.0,
      "predicted": 266127.3327636497
    },
    {
      "time": 49,
      "actual": 169209.94,
      "predicted": 242964.01411260408
    },
    {
      "time": 50,
      "actual": 152644.35,
      "predicted": 218351.49222039734
    },
    {
      "time": 51,
      "actual": 153733.52,
      "predicted": 196704.11497734737
    },
    {
      "time": 52,
      "actual": 246401.79,
      "predicted": 199954.90881193912
    },
    {
      "time": 53,
      "actual": 298401.08,
      "predicted": 217199.07702684507
    },
    {
      "time": 54,
      "actual": 354134.38,
      "predicted": 249734.20676543645
    },
    {
      "time": 55,
      "actual": 392114.05,
      "predicted": 291865.8889124753
    },
    {
      "time": 56,
      "actual": 327660.53,
      "predicted": 322466.1588902828
    },
    {
      "time": 57,
      "actual": 329625.19,
      "predicted": 337108.26953066693
    },
    {
      "time": 58,
      "actual": 322605.44,
      "predicted": 341366.7226130294
    },
    {
      "time": 59,
      "actual": 311724.56,
      "predicted": 333905.24745680555
    },
    {
      "time": 60,
      "actual": 243466.83,
      "predicted": 307752.6389444761
    },
    {
      "time": 61,
      "actual": 228215.92,
      "predicted": 290256.61059018166
    },
    {
      "time": 62,
      "actual": 209802.89,
      "predicted": 269175.3842288402
    },
    {
      "time": 63,
      "actual": 188247.27,
      "predicted": 245536.75417866057
    },
    {
      "time": 64,
      "actual": 163552.31,
      "predicted": 219467.71163192124
    },
    {
      "time": 65,
      "actual": 122012.89,
      "predicted": 198099.41855732538
    },
    {
      "time": 66,
      "actual": 94167.04,
      "predicted": 174515.20384091645
    },
    {
      "time": 67,
      "actual": 71560.71,
      "predicted": 150193.2299357585
    },
    {
      "time": 68,
      "actual": 62255.74,
      "predicted": 128026.6046167968
    },
    {
      "time": 69,
      "actual": 143398.53,
      "predicted": 124480.7999400868
    },
    {
      "time": 70,
      "actual": 180838.44,
      "predicted": 134830.41556840652
    },
    {
      "time": 71,
      "actual": 244179.6,
      "predicted": 161223.23980176472
    },
    {
      "time": 72,
      "actual": 316089.82,
      "predicted": 204245.06247516518
    },
    {
      "time": 73,
      "actual": 393680.4,
      "predicted": 262555.06281440245
    },
    {
      "time": 74,
      "actual": 364725.54,
      "predicted": 301494.7674472948
    },
    {
      "time": 75,
      "actual": 432746.76,
      "predicted": 345814.86764251534
    },
    {
      "time": 76,
      "actual": 494417.6,
      "predicted": 389841.0965686988
    },
    {
      "time": 77,
      "actual": 539043.94,
      "predicted": 429067.06995066226
    },
    {
      "time": 78,
      "actual": 467604.03,
      "predicted": 442073.0024043895
    },
    {
      "time": 79,
      "actual": 476299.89,
      "predicted": 461703.1043758764
    },
    {
      "time": 80,
      "actual": 471629.12,
      "predicted": 468543.96642929775
    },
    {
      "time": 81,
      "actual": 454290.95,
      "predicted": 461484.18649571645
    },
    {
      "time": 82,
      "actual": 356263.64,
      "predicted": 429326.2898163725
    },
    {
      "time": 83,
      "actual": 320432.04,
      "predicted": 403433.2299967974
    },
    {
      "time": 84,
      "actual": 277373.6,
      "predicted": 368434.65251948964
    },
    {
      "time": 85,
      "actual": 247546.51,
      "predicted": 329010.13613051246
    },
    {
      "time": 86,
      "actual": 234360.46,
      "predicted": 290316.13206781953
    },
    {
      "time": 87,
      "actual": 311916.75,
      "predicted": 282513.85512661765
    },
    {
      "time": 88,
      "actual": 338274.55,
      "predicted": 285653.01895332616
    },
    {
      "time": 89,
      "actual": 365066.75,
      "predicted": 301081.5253635939
    },
    {
      "time": 90,
      "actual": 370901.51,
      "predicted": 322784.28726764815
    },
    {
      "time": 91,
      "actual": 275179.48,
      "predicted": 329965.8809949843
    },
    {
      "time": 92,
      "actual": 247273.08,
      "predicted": 318592.640439903
    },
    {
      "time": 93,
      "actual": 215601.07,
      "predicted": 297009.7849919979
    },
    {
      "time": 94,
      "actual": 192607.51,
      "predicted": 266667.75051001733
    },
    {
      "time": 95,
      "actual": 270257.48,
      "predicted": 248960.69797196443
    },
    {
      "time": 96,
      "actual": 261713.38,
      "predicted": 246591.50580480165
    },
    {
      "time": 97,
      "actual": 268525.03,
      "predicted": 250330.51947930455
    },
    {
      "time": 98,
      "actual": 303897.68,
      "predicted": 265865.19699905475
    },
    {
      "time": 99,
      "actual": 370032.18,
      "predicted": 297080.836264764
    },
    {
      "time": 100,
      "actual": 445217.21,
      "predicted": 327862.8006022451
    },
    {
      "time": 101,
      "actual": 566939.55,
      "predicted": 381563.5080524255
    },
    {
      "time": 102,
      "actual": 673220.31,
      "predicted": 452764.551772678
    },
    {
      "time": 103,
      "actual": 719286.38,
      "predicted": 525846.9701011005
    },
    {
      "time": 104,
      "actual": 427682.72,
      "predicted": 537880.9375011504
    },
    {
      "time": 105,
      "actual": 382579.64,
      "predicted": 528822.877902806
    },
    {
      "time": 106,
      "actual": 309175.67,
      "predicted": 486172.1986034948
    },
    {
      "time": 107,
      "actual": 256795.27,
      "predicted": 415833.7342679584
    },
    {
      "time": 108,
      "actual": 233659.17,
      "predicted": 333035.9161436922
    },
    {
      "time": 109,
      "actual": 380914.81,
      "predicted": 315839.2512483514
    },
    {
      "time": 110,
      "actual": 437078.81,
      "predicted": 336375.729325632
    },
    {
      "time": 111,
      "actual": 501038.37,
      "predicted": 386604.7174640683
    },
    {
      "time": 112,
      "actual": 534129.05,
      "predicted": 457623.3936536113
    },
    {
      "time": 113,
      "actual": 420306.47,
      "predicted": 473339.56311700604
    },
    {
      "time": 114,
      "actual": 397857.45,
      "predicted": 483242.6200887653
    },
    {
      "time": 115,
      "actual": 367613.36,
      "predicted": 473392.4988991623
    },
    {
      "time": 116,
      "actual": 345969.25,
      "predicted": 444100.9789277874
    },
    {
      "time": 117,
      "actual": 366497.65,
      "predicted": 367859.0711506335
    },
    {
      "time": 118,
      "actual": 361605.35,
      "predicted": 350394.18652715307
    },
    {
      "time": 119,
      "actual": 361247.74,
      "predicted": 329947.2758402141
    },
    {
      "time": 120,
      "actual": 360492.3,
      "predicted": 309522.29322200024
    },
    {
      "time": 121,
      "actual": 363700.9,
      "predicted": 365230.2448234563
    },
    {
      "time": 122,
      "actual": 362130.95,
      "predicted": 376063.3948341743
    },
    {
      "time": 123,
      "actual": 360556.02,
      "predicted": 388793.89649407804
    },
    {
      "time": 124,
      "actual": 361362.29,
      "predicted": 400602.61284589855
    },
    {
      "time": 125,
      "actual": 364947.44,
      "predicted": 414602.2051367671
    },
    {
      "time": 126,
      "actual": 393749.78,
      "predicted": 402192.5963736568
    },
    {
      "time": 127,
      "actual": 403445.21,
      "predicted": 421728.8397833871
    },
    {
      "time": 128,
      "actual": 418830.1,
      "predicted": 435460.38436662266
    },
    {
      "time": 129,
      "actual": 442647.11,
      "predicted": 444338.31371580076
    },
    {
      "time": 130,
      "actual": 475604.52,
      "predicted": 421647.25366992556
    },
    {
      "time": 131,
      "actual": 516346.43,
      "predicted": 440669.17448485986
    },
    {
      "time": 132,
      "actual": 550384.47,
      "predicted": 462622.3916835905
    },
    {
      "time": 133,
      "actual": 562570.1,
      "predicted": 486690.5178892987
    },
    {
      "time": 134,
      "actual": 467870.93,
      "predicted": 492195.253418577
    },
    {
      "time": 135,
      "actual": 441199.13,
      "predicted": 489250.77565926337
    },
    {
      "time": 136,
      "actual": 400927.17,
      "predicted": 469247.7320213607
    },
    {
      "time": 137,
      "actual": 376404.11,
      "predicted": 437441.65883162356
    },
    {
      "time": 138,
      "actual": 372521.47,
      "predicted": 401195.13647602836
    },
    {
      "time": 139,
      "actual": 464256.42,
      "predicted": 414737.968007047
    },
    {
      "time": 140,
      "actual": 508857.71,
      "predicted": 432286.1245719608
    },
    {
      "time": 141,
      "actual": 550810.57,
      "predicted": 460929.827678845
    },
    {
      "time": 142,
      "actual": 562850.72,
      "predicted": 493827.242305104
    },
    {
      "time": 143,
      "actual": 437536.15,
      "predicted": 480364.80294200516
    },
    {
      "time": 144,
      "actual": 399171.69,
      "predicted": 451011.12877021916
    },
    {
      "time": 145,
      "actual": 343706.3,
      "predicted": 417872.99699118646
    },
    {
      "time": 146,
      "actual": 312627.06,
      "predicted": 388374.05825894274
    },
    {
      "time": 147,
      "actual": 312848.48,
      "predicted": 373000.28674823313
    },
    {
      "time": 148,
      "actual": 476278.21,
      "predicted": 407602.8558219056
    },
    {
      "time": 149,
      "actual": 563164.59,
      "predicted": 441392.411193329
    },
    {
      "time": 150,
      "actual": 658077.84,
      "predicted": 499256.2558630516
    },
    {
      "time": 151,
      "actual": 725754.77,
      "predicted": 571431.0632159304
    },
    {
      "time": 152,
      "actual": 617789.52,
      "predicted": 575072.0927205903
    },
    {
      "time": 153,
      "actual": 628436.24,
      "predicted": 622640.8920443424
    },
    {
      "time": 154,
      "actual": 619668.52,
      "predicted": 671282.6505483774
    },
    {
      "time": 155,
      "actual": 594032.76,
      "predicted": 709920.9050124851
    },
    {
      "time": 156,
      "actual": 476521.63,
      "predicted": 566764.1565053648
    },
    {
      "time": 157,
      "actual": 425224.32,
      "predicted": 536748.819274403
    },
    {
      "time": 158,
      "actual": 364773.92,
      "predicted": 495291.33111566404
    },
    {
      "time": 159,
      "actual": 327695.87,
      "predicted": 447819.7362506021
    },
    {
      "time": 160,
      "actual": 319411.09,
      "predicted": 401516.3128955908
    },
    {
      "time": 161,
      "actual": 471534.99,
      "predicted": 434767.8153821429
    },
    {
      "time": 162,
      "actual": 539926.16,
      "predicted": 480824.81654845923
    },
    {
      "time": 163,
      "actual": 614718.01,
      "predicted": 546314.5458442037
    },
    {
      "time": 164,
      "actual": 662369.32,
      "predicted": 619625.8875695514
    },
    {
      "time": 165,
      "actual": 579070.98,
      "predicted": 554276.8326880451
    },
    {
      "time": 166,
      "actual": 573449.04,
      "predicted": 557203.3060506975
    },
    {
      "time": 167,
      "actual": 560843.53,
      "predicted": 556609.2034601774
    },
    {
      "time": 168,
      "actual": 557285.57,
      "predicted": 552619.710288158
    },
    {
      "time": 169,
      "actual": 575839.76,
      "predicted": 555179.8485036094
    },
    {
      "time": 170,
      "actual": 590714.41,
      "predicted": 554389.1637794834
    },
    {
      "time": 171,
      "actual": 600968.05,
      "predicted": 554798.0446516667
    },
    {
      "time": 172,
      "actual": 592722.1,
      "predicted": 560282.4090903122
    },
    {
      "time": 173,
      "actual": 520870.09,
      "predicted": 543052.7991990573
    },
    {
      "time": 174,
      "actual": 479230.84,
      "predicted": 520912.2183785583
    },
    {
      "time": 175,
      "actual": 427090.98,
      "predicted": 491982.9543818119
    },
    {
      "time": 176,
      "actual": 403598.33,
      "predicted": 461380.3761900083
    },
    {
      "time": 177,
      "actual": 415277.51,
      "predicted": 436504.2911135725
    },
    {
      "time": 178,
      "actual": 577411.83,
      "predicted": 536808.6830881031
    },
    {
      "time": 179,
      "actual": 679896.22,
      "predicted": 630649.6426142406
    },
    {
      "time": 180,
      "actual": 778823.0,
      "predicted": 744578.4250859538
    },
    {
      "time": 181,
      "actual": 826688.68,
      "predicted": 868033.1189327366
    },
    {
      "time": 182,
      "actual": 581666.72,
      "predicted": 656698.6441482054
    },
    {
      "time": 183,
      "actual": 543343.16,
      "predicted": 645265.2695309864
    },
    {
      "time": 184,
      "actual": 476273.73,
      "predicted": 606241.9060860382
    },
    {
      "time": 185,
      "actual": 424382.27,
      "predicted": 546840.6058385565
    },
    {
      "time": 186,
      "actual": 394989.43,
      "predicted": 475917.2625158871
    },
    {
      "time": 187,
      "actual": 510258.75,
      "predicted": 453425.862566612
    },
    {
      "time": 188,
      "actual": 530775.05,
      "predicted": 449381.70312235696
    },
    {
      "time": 189,
      "actual": 562648.99,
      "predicted": 463710.13790365815
    },
    {
      "time": 190,
      "actual": 587657.54,
      "predicted": 493894.9178727
    },
    {
      "time": 191,
      "actual": 564812.93,
      "predicted": 510210.8678760582
    },
    {
      "time": 192,
      "actual": 575327.66,
      "predicted": 523072.73263210093
    },
    {
      "time": 193,
      "actual": 578385.07,
      "predicted": 536591.9938445209
    },
    {
      "time": 194,
      "actual": 572928.73,
      "predicted": 554706.8005778587
    },
    {
      "time": 195,
      "actual": 539609.84,
      "predicted": 540251.1272603074
    },
    {
      "time": 196,
      "actual": 517904.31,
      "predicted": 536438.896145431
    },
    {
      "time": 197,
      "actual": 491254.28,
      "predicted": 523425.48285554844
    },
    {
      "time": 198,
      "actual": 479306.99,
      "predicted": 511125.1870853586
    },
    {
      "time": 199,
      "actual": 485336.98,
      "predicted": 494551.2466214583
    },
    {
      "time": 200,
      "actual": 577928.79,
      "predicted": 552886.2678654527
    },
    {
      "time": 201,
      "actual": 625566.68,
      "predicted": 611947.5023547331
    },
    {
      "time": 202,
      "actual": 675246.32,
      "predicted": 662184.5280528646
    },
    {
      "time": 203,
      "actual": 708611.46,
      "predicted": 699842.7579573471
    },
    {
      "time": 204,
      "actual": 638269.72,
      "predicted": 633320.9152665
    },
    {
      "time": 205,
      "actual": 638917.24,
      "predicted": 634698.4653450759
    },
    {
      "time": 206,
      "actual": 626989.99,
      "predicted": 630559.3956537029
    },
    {
      "time": 207,
      "actual": 604262.92,
      "predicted": 612231.6280407936
    },
    {
      "time": 208,
      "actual": 528274.32,
      "predicted": 579541.2905582457
    },
    {
      "time": 209,
      "actual": 487245.44,
      "predicted": 563295.0749297044
    },
    {
      "time": 210,
      "actual": 440269.95,
      "predicted": 538477.9591866784
    },
    {
      "time": 211,
      "actual": 411646.13,
      "predicted": 504912.79713437933
    },
    {
      "time": 212,
      "actual": 405423.7,
      "predicted": 473661.93828609394
    },
    {
      "time": 213,
      "actual": 541597.83,
      "predicted": 465615.04660150106
    },
    {
      "time": 214,
      "actual": 591158.81,
      "predicted": 488178.7680234118
    },
    {
      "time": 215,
      "actual": 654719.96,
      "predicted": 527562.567937359
    },
    {
      "time": 216,
      "actual": 717504.27,
      "predicted": 578358.0180308761
    },
    {
      "time": 217,
      "actual": 711056.38,
      "predicted": 708032.7308583452
    },
    {
      "time": 218,
      "actual": 766909.83,
      "predicted": 785702.616668289
    },
    {
      "time": 219,
      "actual": 804776.33,
      "predicted": 814280.3227907586
    },
    {
      "time": 220,
      "actual": 807377.54,
      "predicted": 790489.4740532789
    },
    {
      "time": 221,
      "actual": 609289.98,
      "predicted": 730595.798254039
    },
    {
      "time": 222,
      "actual": 555865.47,
      "predicted": 704286.7354243238
    },
    {
      "time": 223,
      "actual": 481886.7,
      "predicted": 652203.2512587525
    },
    {
      "time": 224,
      "actual": 430438.89,
      "predicted": 571315.6869829921
    },
    {
      "time": 225,
      "actual": 408702.92,
      "predicted": 476971.710703579
    },
    {
      "time": 226,
      "actual": 581154.03,
      "predicted": 501883.9240394953
    },
    {
      "time": 227,
      "actual": 633718.16,
      "predicted": 507573.0262435326
    },
    {
      "time": 228,
      "actual": 704723.12,
      "predicted": 527228.6101802858
    },
    {
      "time": 229,
      "actual": 771169.75,
      "predicted": 555290.1554174373
    },
    {
      "time": 230,
      "actual": 751865.05,
      "predicted": 681010.1678487322
    },
    {
      "time": 231,
      "actual": 803607.44,
      "predicted": 747717.3358972413
    },
    {
      "time": 232,
      "actual": 836170.71,
      "predicted": 814809.4898451819
    },
    {
      "time": 233,
      "actual": 834489.75,
      "predicted": 869158.3479259554
    },
    {
      "time": 234,
      "actual": 625166.25,
      "predicted": 725649.3444499507
    },
    {
      "time": 235,
      "actual": 570233.25,
      "predicted": 696746.579505014
    },
    {
      "time": 236,
      "actual": 495184.95,
      "predicted": 637212.1679940469
    },
    {
      "time": 237,
      "actual": 440180.57,
      "predicted": 558827.4291290109
    },
    {
      "time": 238,
      "actual": 411913.35,
      "predicted": 468689.25798808015
    },
    {
      "time": 239,
      "actual": 561540.55,
      "predicted": 492260.97581171803
    },
    {
      "time": 240,
      "actual": 596032.18,
      "predicted": 498883.17456077086
    },
    {
      "time": 241,
      "actual": 646265.43,
      "predicted": 531423.3389481643
    },
    {
      "time": 242,
      "actual": 691396.62,
      "predicted": 585400.5978735175
    },
    {
      "time": 243,
      "actual": 675409.52,
      "predicted": 598926.2963623801
    },
    {
      "time": 244,
      "actual": 707661.71,
      "predicted": 624425.5093948912
    },
    {
      "time": 245,
      "actual": 727085.68,
      "predicted": 640686.9861264749
    },
    {
      "time": 246,
      "actual": 725564.52,
      "predicted": 642618.1586498558
    },
    {
      "time": 247,
      "actual": 680908.43,
      "predicted": 682780.3203928979
    },
    {
      "time": 248,
      "actual": 638867.08,
      "predicted": 685887.5834828409
    },
    {
      "time": 249,
      "actual": 585416.99,
      "predicted": 664461.1091211438
    },
    {
      "time": 250,
      "actual": 573810.27,
      "predicted": 634929.6962752298
    },
    {
      "time": 251,
      "actual": 612922.3,
      "predicted": 608482.9466786261
    },
    {
      "time": 252,
      "actual": 645310.16,
      "predicted": 583784.2250465878
    },
    {
      "time": 253,
      "actual": 774371.16,
      "predicted": 609492.0675184808
    },
    {
      "time": 254,
      "actual": 822030.78,
      "predicted": 645069.0973384366
    },
    {
      "time": 255,
      "actual": 660314.64,
      "predicted": 644273.4600150688
    },
    {
      "time": 256,
      "actual": 665143.83,
      "predicted": 680514.7553228732
    },
    {
      "time": 257,
      "actual": 646899.25,
      "predicted": 677217.2053457621
    },
    {
      "time": 258,
      "actual": 628654.67,
      "predicted": 653868.9099964753
    },
    {
      "time": 259,
      "actual": 610410.09,
      "predicted": 620818.9086155547
    },
    {
      "time": 260,
      "actual": 592165.51,
      "predicted": 614620.4829406649
    }
  ]
    }
  ]
}