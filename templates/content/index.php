<div id="app-content">
<!--
    Ftree is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    Ftree is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with Ftree. If not, see <https://www.gnu.org/licenses/>. 
-->
<canvas id='can'></canvas>
<div id='inp'>
<table>
<tr><td><b>Tree name:</b></td><td><input class='inp' id='t' value='My family'></td><td><center>ID Lines: select id pair and set relation on left.</center></td></tr>
<tr><td>Given names:</td><td><input class='inp' id='g'></td><td class='lin' rowspan='6'><select size='8' id='ln'></select><textarea id='hp' readonly></textarea></td></tr>
<tr><td>Family name:</td><td><input class='inp' id='f'></td></tr>
<tr><td>Gender:</td><td>
<select id="s">
 <option value="0">Female</option>
 <option value="1">Male</option>
 <option value="2">Both</option>
 <option value="3">None</option>
</select>
</td></tr>
<tr><td>Birth:</td><td><input class='inp' id='b'></td></tr>
<tr><td>Death:</td><td><input class='inp' id='d'></td></tr>
<tr><td>Other info:</td><td><input class='inp' id='o'></td></tr>
<tr><td>Relation:</td><td>
<select id="r">
 <option value="0">Choose</option>
 <option value="1">Married > Red</option>
 <option value="2">Parental > Green</option>
 <option value="3">Siblings > Blue</option>
 <option value="4">Adopted > Orange</option>
 <option value="5">Divorced > Yellow</option>
 <option value="6">Unwed parents > Grey</option>
</select>
</td></tr>
<tr><td>Buttons:</td><td><button id="addPer" disabled>New Person</button><button id="updPer" disabled>Update Selected</button><button id="delPer" disabled>Delete Selected</button></td><td>Version 1.2.1</td></tr>
</table>
<button id='fu'>Fullscreen</button>
<button id='nt'>New Tree</button>
<button id='st'>Save Tree</button>
<button id='lt'>Load Tree</button>
<button id="cent">Center Tree</button>
Background colour: <select id='bg'><option>Black</option><option>White</option></select>
<input type="checkbox" id='mu'> Select multiple
</div>
<button id='sh'>Hide</button>
</div>