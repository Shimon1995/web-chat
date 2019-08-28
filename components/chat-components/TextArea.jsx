import uid from "uniqid";
import { connect } from "react-redux";
import { ScrollArea, ScrollTo } from "react-scroll-to";

const TextArea = ({ chat, text }) => (
  <ScrollTo>
    {({ scrollTo }) => (
      <ScrollArea className="textArea">
        <ul
          onClick={() => {
            scrollTo({ y: 100000, smooth: true });
          }}
          ref={text}
        >
          {chat.map(({ name, msg }) => (
            <li
              key={uid()}
              style={name == "Me" ? myMessageStyle : companionMessageStyle}
            >
              {name}
              <br />
              {msg}
            </li>
          ))}
        </ul>
      </ScrollArea>
    )}
  </ScrollTo>
);
function mapStateToProps(state) {
  const { chat, text } = state;
  return {
    chat,
    text
  };
}

const myMessageStyle = {
  color: "white",
  margin: 10,
  marginLeft: "40%",
  padding: "5px",
  borderRadius: "5%",
  backgroundColor: "rgb(0, 194, 242)"
};

const companionMessageStyle = {
  margin: 10,
  marginRight: "40%",
  padding: "5px",
  borderRadius: "5%",
  backgroundColor: "white"
};

export default connect(mapStateToProps)(TextArea);
