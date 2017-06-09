import React, { Component } from 'react';
import styled from 'styled-components';
import { CirclePicker, CompactPicker } from 'react-color';
import { color256 } from './256';
import './App.css';

const Chance = require('chance');

const emotionGraph = {
  nodes: [
    { emotion: 'scared', bg: '#f8f8ff', color: '#333', level: 0 },
    { emotion: 'rejected', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'bewildered', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'confused', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'discouraged', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'helpless', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'insignificant', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'submissive', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'weak', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'insecure', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'foolish', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'anxious', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'embarassed', bg: '#f8f8ff', color: '#333', level: 2 },

    { emotion: 'mad', bg: '#f8f8ff', color: '#333', level: 0 },
    { emotion: 'hurt', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'jealous', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'hostile', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'selfish', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'angry', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'frustrated', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'rage', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'furious', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'hateful', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'irritated', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'critical', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'skeptical', bg: '#f8f8ff', color: '#333', level: 2 },

    { emotion: 'sad', bg: '#f8f8ff', color: '#333', level: 0 },
    { emotion: 'guilty', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'bashful', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'ashamed', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'stupid', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'depressed', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'miserable', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'lonely', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'inadequate', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'bored', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'inferior', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'sleepy', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'apathetic', bg: '#f8f8ff', color: '#333', level: 2 },

    { emotion: 'peaceful', bg: '#f8f8ff', color: '#333', level: 0 },
    { emotion: 'content', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'pensive', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'thoughtful', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'relaxed', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'intimate', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'responsive', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'loving', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'serene', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'trusting', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'sentimental', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'nurturing', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'thankful', bg: '#f8f8ff', color: '#333', level: 2 },

    { emotion: 'powerful', bg: '#f8f8ff', color: '#333', level: 0 },
    { emotion: 'faithful', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'confident', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'important', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'intelligent', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'hopeful', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'worthwhile', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'appreciated', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'valuable', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'respected', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'satisfied', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'proud', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'cheerful', bg: '#f8f8ff', color: '#333', level: 2 },

    { emotion: 'joyful', bg: '#f8f8ff', color: '#333', level: 0 },
    { emotion: 'excited', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'daring', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'sexy', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'fascinating', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'energetic', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'stimulating', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'playful', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'amused', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'creative', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'extravagant', bg: '#f8f8ff', color: '#333', level: 2 },
    { emotion: 'aware', bg: '#f8f8ff', color: '#333', level: 1 },
    { emotion: 'delightful', bg: '#f8f8ff', color: '#333', level: 2 }
  ],
  edges: [
  ]
};

const ColorPane = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 250px;
  background-color: rgba(0,0,0,0.7);
  overflow-x: hidden;
`;

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || false;
}

function saveToStorage(key,data) {
  localStorage.setItem(key, JSON.stringify(data));
}

const Btn = styled.button`
  background-color: ${props => props.bg};
  color: ${props => props.color || 'white'};
  border: 0;
  border-radius: 4px;
  margin: 0 3px;
`;
const EmotionTable = styled.table`
  width: 600px;
  margin: 0 auto;
  font-size: 18px;
  td {
    padding: 4px;
  }
`;
const EmotionSpan = styled.span`
  background-color: ${props => props.bg};
  color: ${props => props.color || 'white'};
  padding: 3px;
  border-radius: 4px;
  font-size: 12px;
`;
const Textarea = styled.textarea`
  min-height:150px;
`;
const Emotion = styled.td`
  background-color: ${props => props.bg};
  color: ${props => props.color};
`;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graph: emotionGraph,
      nodes: getFromStorage('nodes') || emotionGraph.nodes,
      edges: getFromStorage('edges') || [],
      fromNode: '',
      showOutput: false,
      selectedNode: '',
      showColorPane: false
    }
  }
  reset = (e) => {
    saveToStorage(e.target.value, null);
    this.setState({[e.target.value]: []});
  }
  clickFrom = (e) => {
    let fromNode = e.target.value;
    if (fromNode === this.state.fromNode) {
      fromNode = '';
    };
    this.setState({ fromNode });
  }
  clickTo = (e) => {
    const { edges, fromNode } = this.state;
    if ( fromNode === '' ) return;
    const toNode = e.target.value;
    const newEdge = {
      from: fromNode,
      to: toNode
    };
    const updatedEdges = [ ...edges, newEdge];
    saveToStorage('edges', updatedEdges);
    this.setState({ fromNode: '', toNode: '', edges: updatedEdges });
  }
  selectNode = (e) => {
    this.setState({ selectedNode: e.target.value, showColorPane: true })
  }
  updateColor = (color,event) => {
    const { nodes, selectedNode } = this.state;
    // const targetNode = nodes.find(nn => nn.emotion === selectedNode);
    const modifiedNodes = nodes.map((nn,index) => {
      if (nn.emotion !== selectedNode) return nn;
      return {
        ...nn,
        bg: color.hex
      }
    })
    //console.log("targetNode", targetNode, color, modifiedNodes);
    saveToStorage('nodes', modifiedNodes);
    this.setState({nodes: modifiedNodes, showColorPane: false});
  }
  randomize = () => {
    const { nodes } = this.state;
    const chance = new Chance();
    const colorHexes = color256.map(color => color.hex);
    const randomColors = chance.pickset(colorHexes, nodes.length);
    const recolored = nodes.map((node,i) => {
      const newColor = randomColors[i];
      return {
        ...node,
        bg: newColor
      }
    });
    this.setState({ nodes: recolored });
  }
  render() {
    const { fromNode, edges, nodes, showColorPane, showOutput } = this.state;
    
    const usedColors = nodes.map(node => node.bg !== '#f8f8ff' ? node.bg : false );
    const availableColors = color256.filter(el => !usedColors.includes(el.hex));
    console.log("usedColors", usedColors.length, color256.length, availableColors.length);
    return (
      <div className="App">
        { showColorPane &&
          <ColorPane>
            <CompactPicker onChange={ this.updateColor } colors={availableColors.map(co => co.hex)} style={{width: '100%'}}/>
          </ColorPane>
        }
        <EmotionTable>
          <tbody>
            {
              nodes.map((node,i) => {
                const colorData = color256.find(color => color.hex === node.bg);
                if (!colorData) {
                  console.log('no color data why,', node.bg);
                  return null;
                }
                const textColor = parseFloat(colorData.hsl.l) > 40 ? 'black' : 'white';
                const colorName = colorData.name;
                return (
                  <tr key={i}>
                    <Emotion bg={node.bg} color={textColor}>{node.emotion}</Emotion>
                    <td>
                      <Btn
                        bg={ node.emotion === fromNode ? '#008040' : '#800000' }
                        value={node.emotion}
                        onClick={ this.clickFrom }
                      >o</Btn>
                    </td>
                    <td>
                      <Btn
                        value={node.emotion}
                        bg={ fromNode !== '' ? 'green' : 'grey' }
                        onClick={ this.clickTo }>i</Btn>
                    </td>
                    <td>
                      <Btn
                        bg={ node.bg }
                        color={ textColor }
                        value={ node.emotion }
                        onClick={ this.selectNode }
                      >
                        { colorName }
                      </Btn>
                    </td>
                    <td>
                      {
                        edges.filter(ee => ee.from === node.emotion).map(cc => cc.to).map((nn,i) => {
                          const linkedNode = nodes.find(node => node.emotion === nn);
                          const { bg, color } = linkedNode;
                          const emoProps = { bg, color };
                          return <EmotionSpan {...emoProps}>{ nn }</EmotionSpan>
                        })
                      }
                    </td>
                  </tr>
                )
              })
            }
            <tr>
              <td colSpan={4}>
                <Btn value="edges" onClick={this.reset}>Clear Edges</Btn>
                <Btn value="nodes" onClick={this.reset}>Clear Nodes</Btn>
                <Btn onClick={this.randomize}>randomize colors</Btn>
              </td>
            </tr>
          </tbody>
        </EmotionTable>
        <div className="App-header">
          <button onClick={ () => this.setState({showOutput: !showOutput}) }>JSON output</button>
          { showOutput && <Textarea style={{width: '100%', height: '100%'}} value={ JSON.stringify({ nodes, edges }) } /> }
        </div>
      </div>
    );
  }
}

export default App;
