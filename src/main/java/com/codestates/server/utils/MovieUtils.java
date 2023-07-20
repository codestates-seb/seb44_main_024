package com.codestates.server.utils;

import com.codestates.server.api.service.ApiService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MovieUtils {
    @Autowired
    ApiService apiService;
    @Autowired
    JSONParser jsonParser;

    public List<String> getBoxOffice() throws IOException, ParseException {
        Object json = apiService.getBoxOffice();

        // JSON parse
        JSONObject jsonObject = (JSONObject) jsonParser.parse(json.toString());
        JSONObject boxOfficeResult = (JSONObject) jsonObject.get("boxOfficeResult");
        JSONArray dailyBoxOfficeList = (JSONArray) boxOfficeResult.get("dailyBoxOfficeList");

        List<String> boxOfficeList = new ArrayList<>();

        for (Object object : dailyBoxOfficeList) {
            JSONObject jsonobj = (JSONObject) object;
            boxOfficeList.add((String) jsonobj.get("movieNm"));
//            if (boxOfficeList.size() >= 5) {
//                return boxOfficeList;
//            }
        }
        return boxOfficeList;
    }

    public List<String> getResult(String api) throws ParseException {
        JSONObject jsonObject = (JSONObject) jsonParser.parse(api);
        JSONArray data = (JSONArray) jsonObject.get("Data");

        JSONObject firstElement = (JSONObject) data.get(0);
        JSONArray result = (JSONArray) firstElement.get("Result");
        if (result == null) {
            return List.of();
        }

        return (List<String>) result.stream()
                .map(i -> i.toString())
                .collect(Collectors.toList());
    }

    public List<String> getResult(List<String> api) throws ParseException {
        List<String> list = new ArrayList<>();

        for (String json : api) {
            JSONObject jsonObject = (JSONObject) jsonParser.parse(json);
            JSONArray data = (JSONArray) jsonObject.get("Data");

            JSONObject firstElement = (JSONObject) data.get(0);
            JSONArray result = (JSONArray) firstElement.get("Result");
            result.stream()
                    .map(i -> i.toString())
                    .forEach(i -> list.add((String) i));
        }
        return list;
    }
}



