package components;


import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.ViewGroup;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

import static android.support.v7.widget.RecyclerView.ViewHolder;

public class ItemsAdapter<T> extends RecyclerView.Adapter {

    public static final int FOOTER = 1;
    public static final int ITEM = 0;

    private List<T> items;
    private AtomicBoolean showProgress = new AtomicBoolean(true);
    private PresenterFactory factory;

    public ItemsAdapter(List<T> items) {
        this.items = items;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        return factory == null || items.isEmpty() ? new EmptyPresenter(parent, viewType, inflater) : factory.create(parent, viewType, inflater);
    }

    @Override
    public int getItemViewType(int position) {
        return position == items.size() ? FOOTER : ITEM;
    }

    public void onBindViewHolder(ViewHolder holder, int position) {
        T item = position >= items.size() ? null : items.get(position);
        ((Presenter<T>) holder).show(item, showProgress.get());
    }

    @Override
    public int getItemCount() {
        return items.size() + (showProgress.get() ? 1 : 0);
    }

    public void append(List<T> items) {
        this.items.addAll(0, items);
        notifyDataSetChanged();
    }

    public void showProgress() {
        showProgress.set(true);
        notifyDataSetChanged();
    }

    public void hideProgress() {
        showProgress.set(false);
        notifyDataSetChanged();
    }

    public void clear() {
        this.items.clear();
        notifyDataSetChanged();
    }

    public void setFactory(PresenterFactory factory) {
        this.factory = factory;
    }

    public interface Presenter<T> {
        void show(T item, boolean progress);
    }
}
