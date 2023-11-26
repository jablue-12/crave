package com.crave.backend.gpt;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Choice(int index, Message message) {}
