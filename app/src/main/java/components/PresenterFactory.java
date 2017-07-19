package components;


import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.ViewGroup;

public interface PresenterFactory {
    RecyclerView.ViewHolder create(ViewGroup parent, int viewType, LayoutInflater inflater);
}
