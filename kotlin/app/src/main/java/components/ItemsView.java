package components;

import android.content.Context;
import android.support.annotation.Nullable;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.util.AttributeSet;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import io.reactivex.Observable;
import io.reactivex.functions.Consumer;

public class ItemsView extends RecyclerView {

    protected final ScrollListener scrollListener;
    protected final ItemsAdapter itemsAdapter;

    public ItemsView(Context context) {
        this(context, null);
    }

    public ItemsView(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public ItemsView(Context context, @Nullable AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);

//        int columns = getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT ? 1 : 2;
        int columns = 1;

        StaggeredGridLayoutManager layoutManager = new StaggeredGridLayoutManager(columns, StaggeredGridLayoutManager.VERTICAL);
        setLayoutManager(layoutManager);

        scrollListener = new ScrollListener(layoutManager);
        addOnScrollListener(scrollListener);

        itemsAdapter = new ItemsAdapter<Object>(new ArrayList<Object>());
        setAdapter(itemsAdapter);
    }

    public Observable<Integer> bottomReached() {
        return scrollListener.bottomReached();
    }

    public void clear() {
        itemsAdapter.clear();
        scrollListener.restart();
    }

    public void loading() {
        itemsAdapter.showProgress();
    }

    public void append(List<Object> items) {
        itemsAdapter.append(items);
    }

    public void append(Object item) {
        append(Collections.singletonList(item));
    }

    public void settle() {
        itemsAdapter.hideProgress();
    }

    public Consumer<Boolean> clearAction() {
        return new Consumer<Boolean>() {
            @Override
            public void accept(Boolean aBoolean) throws Exception {
                clear();
            }
        };
    }

    public Consumer<Object> loadingAction() {
        return new Consumer<Object>() {
            @Override
            public void accept(Object booleanIntegerPair) throws Exception {
                loading();
            }
        };
    }

    public void presenterFactory(PresenterFactory factory) {
        itemsAdapter.setFactory(factory);
    }
}