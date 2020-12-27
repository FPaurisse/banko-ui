import styled from 'styled-components';

const TagStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: flex-start;
    margin: .5rem 0;
    padding: 0 .5rem;
    overflow: auto;
`;

const Tag = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #FFFFFF;
    width: 25%;
    max-width: 25%;
    min-width: 25%;
    height: 120px;
    max-height: 120px;
    min-height: 120px;
    box-sizing: border-box;
    overflow: hidden;
    padding: 0 .2rem;
    border-radius: .3rem;
    cursor: pointer;
    transition: .2s;
    border-style: solid;
    border-width: 1px 1px 1px 1px;
    border-color: #DFEEF3 #DFEEF3 #DFEEF3 #DFEEF3;
    &:hover{
        transition: .2s;
        background-color: #FBFBFB;
        box-shadow: 0px 0px 5px #EBEBEB;
    }
`;

const Add = styled.div`
    display: flex;
    align-items: center;
    background-color: #edf0f2;
    justify-content: center;
    width: 25%;
    max-width: 25%;
    min-width: 25%;
    height: 120px;
    max-height: 120px;
    min-height: 120px;
    box-sizing: border-box;
    overflow: hidden;
    padding: 0 .2rem;
    border-radius: .3rem;
    cursor: pointer;
    color: #DDDDDD;
    font-weight: bold;
    text-transform: uppercase;
    border-style: dashed;
    font-size: 16px;
    transition: .2s;
    border-width: 3px 3px 3px 3px;
    border-color: #DDDDDD #DDDDDD #DDDDDD #DDDDDD; 
    &:hover{
        transition: .2s;
        background-color: #FBFBFB;
    }
`;

const TagDetail = styled.span`
    display: flex;
    padding: .5rem 0;
    flex: 1;
`;

const TagActions = styled.span`
    display: flex;
`;

const Loading = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export { TagStyle, Tag, Add, TagDetail, TagActions, Loading };
