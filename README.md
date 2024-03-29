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
    <div>   hello1     </div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div>   hello2     </div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  ```
- **Output:**
  ```
    <div>hello1     </div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div>   hello2</div>
  ```

###### Example-6 nested div with text nodes
- **Input:**
  ```
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div>  hello1  </div>
      <div></div>
      <div></div>
      <div>  hello2  </div>
      <div></div>
      <div></div>
    </div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  ```
- **Output:**
  ```
    <div>
      <div>hello1  </div>
      <div></div>
      <div></div>
      <div>  hello2</div>
    </div>
  ```

###### Example-7 First node as text node
- **Input:**
  ```
    hello1
    <div>
      <div></div>
      <div>  hello2  </div>
      <div></div>
      <div></div>
      <div>  hello3  </div>
      <div></div>
      <div></div>
    </div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  ```
- **Output:**
  ```
    hello1
    <div>
      <div></div>
      <div>  hello2  </div>
      <div></div>
      <div></div>
      <div>  hello3</div>
    </div>
  ```

## openVirtualKeyboard
  - Opens virtual keyboard in touch devices

## replaceAll
- There is no support of replaceAll method in old browsers, so it is its wrapper method which if browser's replaceAll method is available, it will use it, otherwise it will replace with custom logic using lodash's replace method.


