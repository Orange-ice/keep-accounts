import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/components/message.module.scss';
import cs from 'classnames';

interface Props {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

const Message: React.FC<Props> = (props) => {
  const {message, type = 'success'} = props;
  const [msgVisible, setMsgVisible] = React.useState(true);

  React.useEffect(() => {
    const handle = setTimeout(() => {
      setMsgVisible(false);
    }, 3000);

    return () => {
      clearTimeout(handle);
    };
  }, []);

  return ReactDOM.createPortal((msgVisible ?
    <div className={cs(styles.container, styles[type])}>
      {message}
    </div> :
    null), document.body);
};

const alert = (message: string, type?: 'info' | 'success' | 'warning' | 'error') => {
  const component = <Message message={message} type={type}/>;
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(component, div);

  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  }, 3000);
};

export {alert};