package components;


import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;

import io.reactivex.Observable;
import io.reactivex.subjects.PublishSubject;
import io.reactivex.subjects.Subject;


public class ScrollListener extends RecyclerView.OnScrollListener {

    private final StaggeredGridLayoutManager layoutManager;
    private final Subject<Integer> bottomReachedSubject;

    public ScrollListener(StaggeredGridLayoutManager layoutManager) {
        this.layoutManager = layoutManager;
        this.bottomReachedSubject = PublishSubject.create();
    }

    @Override
    public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
        super.onScrollStateChanged(recyclerView, newState);
        if (newState == RecyclerView.SCROLL_STATE_DRAGGING) {
            return;
        }

        int[] visible = layoutManager.findLastVisibleItemPositions(null);
        int lastPosition = visible[visible.length - 1];

        int itemCount = layoutManager.getItemCount();
        if (lastPosition + layoutManager.getSpanCount() >= itemCount) {
            bottomReachedSubject.onNext(itemCount);
        }
    }

    public void restart() {
        bottomReachedSubject.onNext(0);
    }

    public Observable<Integer> bottomReached() {
        return bottomReachedSubject.share();
    }


}
