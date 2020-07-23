# web-util
Misc Web Development utility functions

## htmlTrim
 - Removes empty nodes/html from the both side of a given html template or String. 

#### Examples

###### Example-1: Remove all begining empty nodes
- **Input:** 
  ```
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div>hello</div>
  ```
- **Output:**
  ```
    <div>hello</div>
  ```

###### Example-2: Remove all end empty nodes
- **Input:** 
  ```
    <div>hello</div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  ```
- **Output:**
  ```
    <div>hello</div>
  ```


###### Example-3: Trim start of first non empty nodes
- **Input:** 
  ```
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div>      hello</div>
  ```
- **Output:**
  ```
    <div>hello</div>
  ```

###### Example-4: Trim end of last non empty nodes
- **Input:** 
  ```
    <div>hello     </div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  ```
- **Output:**
  ```
    <div>hello</div>
  ```

###### Example-5: Remove all empty nodes from begining and end also start trim first non empty nodes and end trim last non empty nodes.
- **Input:** 
  ```
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div>   hello     </div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  ```
- **Output:**
  ```
    <div>hello</div>
  ```