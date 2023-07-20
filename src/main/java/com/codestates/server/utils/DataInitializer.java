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
        List<String> tags = Arrays.asList("감동", "음악", "힐링", "킬링타임", "모험", "창의적", "영상미", "영감", "긴장감", "반전");
        List<Tag> tagEntities = tags.stream()
                .map(Tag::new)
                .collect(Collectors.toList());

        tagRepository.saveAll(tagEntities);
    }
}
