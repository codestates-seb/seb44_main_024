package com.codestates.server;

import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();
        set.add("abc");
        set.add("bcd");
        set.add("cdf");

        Set<String> set1 = new HashSet<>();
        set.add("bcd");
        set.add("cdf");
        set.add("abc");

        System.out.println(set.containsAll(set1));
    }
}
