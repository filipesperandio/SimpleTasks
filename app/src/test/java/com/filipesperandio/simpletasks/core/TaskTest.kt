package com.filipesperandio.simpletasks.core

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test

class TaskTest {
    @Test
    fun createTask() {
        val task = Task(title = "Task1", done = false, createdAt = 1462421108736)

        assertThat(task).isEqualTo(Task(title="Task1", done=false, createdAt = 1462421108736))
    }
}