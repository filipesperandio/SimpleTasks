package com.filipesperandio.simpletasks.core

import android.support.v7.widget.RecyclerView
import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.CheckBox
import android.widget.TextView
import com.filipesperandio.simpletasks.R
import com.jakewharton.rxbinding2.view.RxView
import components.ItemsAdapter

class TaskPresenter(parent: ViewGroup, viewType: Int, inflater: LayoutInflater) :
        RecyclerView.ViewHolder(inflater.inflate(R.layout.task, parent, false)), ItemsAdapter.Presenter<Task> {

    override fun show(item: Task?, progress: Boolean) {
        if (item == null) {
            return;
        }
        val taskTitle = itemView.findViewById(R.id.taskTitle) as TextView
        taskTitle.text = item.title

        val taskDone = itemView.findViewById(R.id.taskDone) as CheckBox
        taskDone.setChecked(item.done)

        RxView.clicks(taskDone).subscribe {
            item.done = !item.done
            Log.d("TAG", item.toString())
        };

        RxView.clicks(itemView.findViewById(R.id.edit_task_button)).subscribe {
            Log.d("OK", "okok" + item.id)
        }

    }
}