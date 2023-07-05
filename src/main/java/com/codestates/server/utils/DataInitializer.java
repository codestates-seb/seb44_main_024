package com.codestates.server.utils;

import com.codestates.server.tag.entity.Tag;
import com.codestates.server.tag.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    TagRepository tagRepository;

    @Override
    public void run(String... args) throws Exception {
        List<String> tags = Arrays.asList("재미있어요", "감동적이에요", "스릴 넘쳐요", "웃겨요", "눈물나는", "설레는", "몰입도 높은", "예술적인", "생각할 거리가 있는", "인상 깊은");
        List<Tag> tagEntities = tags.stream()
                .map(Tag::new)
                .collect(Collectors.toList());

        tagRepository.saveAll(tagEntities);
    }
}
