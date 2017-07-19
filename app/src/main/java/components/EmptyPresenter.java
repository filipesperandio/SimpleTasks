package components;


import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.ViewGroup;

import com.filipesperandio.simpletasks.R;

class EmptyPresenter extends RecyclerView.ViewHolder implements ItemsAdapter.Presenter<Object> {
    public EmptyPresenter(ViewGroup parent, int viewType, LayoutInflater inflater) {
        super(inflater.inflate(R.layout.empty,parent,false));
    }

    @Override
    public void show(Object item, boolean progress) {
    }
}
