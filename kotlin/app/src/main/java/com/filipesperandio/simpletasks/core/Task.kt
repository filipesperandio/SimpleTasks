package com.filipesperandio.simpletasks.core

import java.util.*


data class Task(var id: UUID = UUID.randomUUID(), var createdAt: Date = Date(), var title: String, var done: Boolean)