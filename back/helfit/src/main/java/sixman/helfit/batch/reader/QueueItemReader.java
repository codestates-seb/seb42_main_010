package sixman.helfit.batch.reader;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.UnexpectedInputException;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class QueueItemReader<T> implements ItemReader<T> {

    private Queue<T> queue;

    public QueueItemReader(List<T> data) {
        this.queue = new LinkedList<>(data);
    }

    @Override
    public T read() throws Exception, UnexpectedInputException, NonTransientResourceException {
        return this.queue.poll();
    }
}
