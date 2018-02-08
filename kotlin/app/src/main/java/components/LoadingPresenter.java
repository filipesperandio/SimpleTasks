package components;

import android.graphics.Color;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.filipesperandio.simpletasks.R;

public class LoadingPresenter<I> extends RecyclerView.ViewHolder implements ItemsAdapter.Presenter<I> {

    public LoadingPresenter(View itemView) {
        super(itemView);
    }

    public LoadingPresenter(ViewGroup parent, int viewType, LayoutInflater inflater) {
        this(inflater.inflate(R.layout.loading, parent, false));
    }

    @Override
    public void show(I item, boolean progress) {
        itemView.setVisibility(View.VISIBLE);
        itemView.setBackgroundColor(Color.GREEN);
    }
}
