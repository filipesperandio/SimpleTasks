package com.filipesperandio.simpletasks

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.filipesperandio.simpletasks.core.Task
import com.filipesperandio.simpletasks.core.TaskPresenter
import components.PresenterFactory
import io.reactivex.Observable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.subjects.PublishSubject
import kotlinx.android.synthetic.main.activity_main.*
import java.util.concurrent.TimeUnit

class MainActivity : AppCompatActivity() {

    private var tasksBus: PublishSubject<Task> = PublishSubject.create()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        tasks.presenterFactory(TaskPresenterFactory())

        Observable.interval(1, TimeUnit.SECONDS)
                .doOnNext { it + 1 }
                .take(10)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe {
                    val task = Task(it.toString(), false, it)
                    tasksBus.onNext(task)
                }

        tasksBus.subscribe { tasks.append(it) }

    }
}

class TaskPresenterFactory : PresenterFactory {
    override fun create(parent: ViewGroup, viewType: Int, inflater: LayoutInflater): RecyclerView.ViewHolder {
        return TaskPresenter(parent, viewType, inflater);
    }

}

