package com.filipesperandio.simpletasks.core

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import java.util.*

class TaskTest {
    @Test
    fun createTask() {
        val task = Task(title = "Task1", done = false, createdAt = Date())

        assertThat(task.id.toString()).isNotBlank()
        assertThat(task.done).isFalse()
    }
}